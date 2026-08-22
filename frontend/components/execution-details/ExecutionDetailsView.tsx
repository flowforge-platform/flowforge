"use client";

import { useEffect, useState, useCallback } from "react";
import { notFound } from "next/navigation";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Node, Edge } from "@xyflow/react";

import { ExecutionDetails } from "@/types/execution-details";
import { getExecutionDetails } from "@/lib/api/execution-details";
import { getWorkflowDefinition } from "@/lib/api/workflow";
import { fromWorkflowDefinition } from "@/lib/mappers/workflow.mapper";
import ExecutionHeader from "./ExecutionHeader";
import WorkflowExecutionCanvas from "./WorkflowExecutionCanvas";

import ExecutionTimeline from "./ExecutionTimeline";
import ActiveLogs from "./ActiveLogs";

interface ExecutionDetailsViewProps {
  executionId?: string;
  execution?: ExecutionDetails;
}

export default function ExecutionDetailsView({
  executionId,
  execution: initialExecution,
}: ExecutionDetailsViewProps) {
  const [execution, setExecution] = useState<ExecutionDetails | null>(
    initialExecution || null
  );
  const [isLoading, setIsLoading] = useState<boolean>(
    !initialExecution && Boolean(executionId)
  );
  const [error, setError] = useState<string | null>(null);

  const [workflowNodes, setWorkflowNodes] = useState<Node[]>([]);
  const [workflowEdges, setWorkflowEdges] = useState<Edge[]>([]);

  const fetchExecution = useCallback(async () => {
    if (!executionId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getExecutionDetails(executionId);
      if (!data) {
        notFound();
        return;
      }
      setExecution(data);
    } catch (err: any) {
      console.error("Failed to fetch execution details:", err);
      if (err?.response?.status === 404) {
        notFound();
        return;
      }
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load execution details."
      );
    } finally {
      setIsLoading(false);
    }
  }, [executionId]);

  useEffect(() => {
    if (!initialExecution && executionId) {
      fetchExecution();
    }
  }, [fetchExecution, initialExecution, executionId]);

  useEffect(() => {
    async function loadWorkflowCanvas() {
      if (!execution?.workflowId) return;
      try {
        const definition = await getWorkflowDefinition(execution.workflowId);
        if (definition) {
          const { nodes, edges } = fromWorkflowDefinition(definition);
          setWorkflowNodes(nodes);
          setWorkflowEdges(edges);
        }
      } catch (err) {
        console.warn("Failed to load workflow canvas definition:", err);
      }
    }
    loadWorkflowCanvas();
  }, [execution?.workflowId]);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-64px)] flex-col items-center justify-center space-y-3 bg-background text-center">
        <RefreshCw className="size-7 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Loading execution details...</p>
      </div>
    );
  }

  if (error || !execution) {
    return (
      <div className="flex h-[calc(100vh-64px)] flex-col items-center justify-center space-y-3 bg-background text-center">
        <AlertCircle className="size-8 text-destructive" />
        <div className="space-y-1">
          <p className="font-semibold text-foreground">Error Loading Execution</p>
          <p className="max-w-md text-sm text-muted-foreground">{error || "Execution details could not be loaded."}</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchExecution} className="mt-2 gap-2">
          <RefreshCw className="size-4" />
          Retry
        </Button>
      </div>
    );
  }

  const canvasNodes = workflowNodes.map((node) => {
    const executionNode = execution.nodes.find(
      (n) => n.id === node.id
    );

    return {
      ...node,
      data: {
        ...node.data,
        executionStatus: executionNode?.status || "PENDING",
      },
    };
  });

  return (
    <main className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Center */}
      <section className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <ExecutionHeader execution={execution} />

        {/* Canvas */}
        <div className="flex-1">
          <WorkflowExecutionCanvas
            nodes={canvasNodes}
            edges={workflowEdges}
          />
        </div>

        {/* Logs */}
        <ActiveLogs execution={execution} />
      </section>

      {/* Right Timeline */}
      <ExecutionTimeline execution={execution} />
    </main>
  );
}