"use client";

import {
  ChevronLeft,
  ChevronRight,
  Play,
  ShieldCheck,
  ZoomIn,
  ZoomOut,
  ScanSearch,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useReactFlow, useStore } from "@xyflow/react";
import { useWorkflowStore } from "@/lib/stores/workflow-store";
import { workflowService } from "@/services/workflow.service";
import { validateWorkflow } from "@/lib/workflow/validator";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export function WorkflowToolbar() {


    const router = useRouter()

    const {
        nodes,
        edges,
        workflowName,
        setWorkflowName,
        selectedNodeId,
        duplicateNode,
        exportWorkflow,
        importWorkflow,
        workflowId,
        setWorkflowId,
        setIsDirty,
        isDirty
    } = useWorkflowStore();

    const {zoomIn, zoomOut, fitView} = useReactFlow()
    const zoom = useStore((state) => state.transform[2])

    const handleSave = async () => {
      const workflow = exportWorkflow();

      const savedWorkflow = workflowId
        ? await workflowService.update(
            workflow.id,
            {
              name: workflow.name,
              description: workflow.description,
            },
            workflow.nodes,
            workflow.edges
          )
        : await workflowService.create(
            {
              name: workflow.name,
              description: workflow.description,
            },
            workflow.nodes,
            workflow.edges
          );

      setIsDirty(false)

      if(!workflowId){
        setWorkflowId(savedWorkflow.id);

        router.replace(`/workflows/${savedWorkflow.id}`)
      }

      console.log("Saved", savedWorkflow)
    };

    const handleLoad = async () => {
        const workflows =
          await workflowService.getAll();
            
        if (workflows.length === 0) return;
            
        const workflow =
          await workflowService.loadWorkflow(
            workflows[0].id
          );
        
        importWorkflow(workflow);
    }

    const handleValidate = () => {
      const errors = validateWorkflow(
        nodes,
        edges
      );
  
      if (errors.length === 0) {
        alert("Workflow is valid");
        return;
      }
  
      console.log(errors);
  
      alert(`${errors.length} validation errors`);
    };

  return (
    <div className="flex h-16 items-center justify-between border-b border-zinc-800 bg-[#09090B] px-6">

      {/* Left */}
      <div className="flex items-center gap-4">
        <Input
          value={workflowName}
          onChange={(e)=> {
            setWorkflowName(e.target.value)
            setIsDirty(true)
          }}
          className="w-64 border-zinc-700 bg-zinc-900"
        />
        {isDirty && (
          <Badge variant="secondary" className="p-3">
              Unsaved
          </Badge>
        )}

        <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-xs text-emerald-400">
          Draft
        </span>
      </div>

      {/* Center */}
      <div className="flex items-center gap-2">

        <Button
          variant="outline"
          size="icon"
          disabled
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          disabled
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <div className="mx-3 h-6 w-px bg-zinc-700" />

        <Button
          variant="outline"
          size="icon"
          onClick={() => zoomOut()}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>

        <div className="w-14 text-center text-sm">
          {Math.round(zoom * 100)}%
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => zoomIn()}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          onClick={() => fitView({ duration: 500 })}
        >
          <ScanSearch className="mr-2 h-4 w-4" />
          Fit View
        </Button>

        <Button
            variant="outline"
            onClick={()=>{
                if(selectedNodeId){
                    duplicateNode(selectedNodeId)
                }
            }}
        >
            Duplicate
        </Button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        

        <Button variant="secondary" onClick={handleValidate}>
          <ShieldCheck className="mr-2 h-4 w-4" />
          Validate
        </Button>

        <Button onClick={handleSave} disabled={!isDirty}>
            Save
        </Button>
        
        <Button onClick={handleLoad}>
            Load
        </Button>

        <Button>
          <Play className="mr-2 h-4 w-4" />
          Run Workflow
        </Button>

      </div>

    </div>
  );
}