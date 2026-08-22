"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  ShieldCheck,
  ZoomIn,
  ZoomOut,
  ScanSearch,
  Upload,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useReactFlow, useStore } from "@xyflow/react";
import { useWorkflowStore } from "@/lib/stores/workflow-store";
import { workflowService } from "@/services/workflow.service";
import { getExecution, startExecution } from "@/lib/api/executions";
import { validateWorkflow } from "@/lib/workflow/validator";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export function WorkflowToolbar() {
  const router = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);

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
    workflowStatus,
    setWorkflowStatus,
    activeExecutionId,
    activeExecutionStatus,
    setActiveExecution,
    setIsDirty,
    isDirty
  } = useWorkflowStore();

  const isPublished = workflowStatus === "PUBLISHED";
  const isExecuting =
    activeExecutionStatus === "PENDING" || activeExecutionStatus === "RUNNING";

  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const zoom = useStore((state) => state.transform[2]);

  useEffect(() => {
    if (!activeExecutionId) return;
    if (
      activeExecutionStatus === "COMPLETED" ||
      activeExecutionStatus === "FAILED"
    ) {
      return;
    }

    let errorCount = 0;
    const maxErrors = 3;

    const intervalId = setInterval(async () => {
      try {
        const data = await getExecution(activeExecutionId);
        errorCount = 0;
        setActiveExecution(activeExecutionId, data.status);

        if (data.status === "COMPLETED" || data.status === "FAILED") {
          clearInterval(intervalId);
        }
      } catch (err) {
        console.error("Failed to poll execution status:", err);
        errorCount++;
        if (errorCount >= maxErrors) {
          clearInterval(intervalId);
          alert("Lost connection to execution updates.");
        }
      }
    }, 1500);

    return () => clearInterval(intervalId);
  }, [activeExecutionId, activeExecutionStatus, setActiveExecution]);

  const handleSave = async () => {
    if (isPublished) {
      alert("Published workflows cannot be modified.");
      return null;
    }

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

    setIsDirty(false);
    setWorkflowStatus(savedWorkflow.status || "DRAFT");

    if (!workflowId) {
      setWorkflowId(savedWorkflow.id);

      router.replace(`/workflows/${savedWorkflow.id}`);
    }

    console.log("Saved", savedWorkflow);
    return savedWorkflow;
  };

  const handlePublish = async () => {
    if (isPublished) {
      alert("Workflow is already published.");
      return;
    }

    setIsPublishing(true);

    try {
      let targetWorkflowId = workflowId;

      if (!targetWorkflowId || isDirty) {
        const savedWorkflow = await handleSave();
        if (!savedWorkflow) {
          setIsPublishing(false);
          return;
        }
        targetWorkflowId = savedWorkflow.id;
      }

      if (!targetWorkflowId) {
        setIsPublishing(false);
        return;
      }

      await workflowService.publish(targetWorkflowId);
      setWorkflowStatus("PUBLISHED");
      setIsDirty(false);
      alert("Workflow published successfully!");
    } catch (error: any) {
      console.error("Failed to publish workflow:", error);
      alert(
        error?.response?.data?.message ||
        "Failed to publish workflow. Please try again."
      );
    } finally {
      setIsPublishing(false);
    }
  };

  const handleRunExecution = async () => {
    if (!workflowId) {
      alert("Please save and publish the workflow before running.");
      return;
    }

    if (!isPublished) {
      alert(
        "Workflow must be published before it can be executed."
      );
      return;
    }

    if (isExecuting) {
      return;
    }

    try {
      setActiveExecution(null, "PENDING");
      const response = await startExecution(workflowId);
      // Backend returns record StartExecutionResponse(UUID workflowId, WorkflowExecutionStatus status)
      // where response.workflowId is the execution UUID.
      const executionId = response.workflowId;
      const status = response.status || "PENDING";

      setActiveExecution(executionId, status);
    } catch (error: any) {
      console.error("Failed to run workflow:", error);
      setActiveExecution(null, null);
      alert(
        error?.response?.data?.message ||
        "Failed to run workflow. Please ensure the workflow is published and try again."
      );
    }
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
  };

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
          disabled={isPublished}
          onChange={(e) => {
            setWorkflowName(e.target.value);
            setIsDirty(true);
          }}
          className="w-64 border-zinc-700 bg-zinc-900"
        />
        {isDirty && !isPublished && (
          <Badge variant="secondary" className="p-3">
            Unsaved
          </Badge>
        )}

        {isPublished ? (
          <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Published
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-md border border-zinc-700/50 bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
            Draft
          </span>
        )}

        {activeExecutionStatus === "PENDING" || activeExecutionStatus === "RUNNING" ? (
          <span className="flex items-center gap-1.5 rounded-md bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-400">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Execution: {activeExecutionStatus}
          </span>
        ) : activeExecutionStatus === "COMPLETED" ? (
          <span className="flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Execution: COMPLETED
          </span>
        ) : activeExecutionStatus === "FAILED" ? (
          <span className="flex items-center gap-1.5 rounded-md bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400">
            <XCircle className="h-3.5 w-3.5" />
            Execution: FAILED
          </span>
        ) : null}
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
          disabled={isPublished}
          onClick={() => {
            if (selectedNodeId && !isPublished) {
              duplicateNode(selectedNodeId);
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

        <Button onClick={handleSave} disabled={!isDirty || isPublished || isPublishing}>
          Save
        </Button>

        <Button
          variant="outline"
          onClick={handlePublish}
          disabled={isPublishing || isPublished}
          className={isPublished ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-400" : ""}
        >
          {isPublishing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Publishing...
            </>
          ) : isPublished ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-400" />
              Published
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Publish
            </>
          )}
        </Button>

        <Button onClick={handleLoad}>
          Load
        </Button>

        <Button
          onClick={handleRunExecution}
          disabled={!isPublished || isExecuting}
          title={!isPublished ? "Workflow must be published before execution" : "Run Workflow"}
          aria-label={!isPublished ? "Workflow must be published before execution" : "Run Workflow"}
        >
          {isExecuting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Run Workflow
            </>
          )}
        </Button>

      </div>

    </div>
  );
}