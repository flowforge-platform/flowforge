"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

import WorkflowEditor from "@/components/workflow-builder/editor/workflow-editor";
import { workflowService } from "@/services/workflow.service";
import { useWorkflowStore } from "@/lib/stores/workflow-store";

export default function WorkflowPage() {
  const { id } = useParams();

  const {importWorkflow, resetWorkflow} = useWorkflowStore()

  useEffect(() => {
    async function loadWorkflow() {
      
      if (id === "new") {
        resetWorkflow();
        return;
      }

      const workflow = await workflowService.getById(
        id as string
      );

      if (workflow) {
        importWorkflow(workflow);
      }
    }

    loadWorkflow();
  }, [id, importWorkflow]);

  return <WorkflowEditor />;
}