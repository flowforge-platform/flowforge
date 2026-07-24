"use client";

import { ExecutionDetails } from "@/types/execution-details";
import ExecutionHeader from "./ExecutionHeader";
import ExecutionSidebar from "./ExecutionSidebar";
import WorkflowExecutionCanvas from "./WorkflowExecutionCanvas";

import { executionWorkflowEdges, executionWorkflowNodes } from "@/mocks/execution-workflow";
import ExecutionTimeline from "./ExecutionTimeline";
import ActiveLogs from "./ActiveLogs";

interface ExecutionDetailsViewProps {
  execution: ExecutionDetails;
}

export default function ExecutionDetailsView({
  execution,
}: ExecutionDetailsViewProps) {

    const nodes = executionWorkflowNodes.map((node) => {
      const executionNode = execution.nodes.find(
        (n) => n.id === node.id
      );

      return {
        ...node,
        data: {
          ...node.data,
          executionStatus: executionNode?.status,
        },
      };
    });

  return (
    <main className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Left Sidebar */}
      <ExecutionSidebar
      execution={execution}
    />

      {/* Center */}
      <section className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <ExecutionHeader
            execution={execution}
        />

        {/* Canvas */}
        <div className="flex-1">
        <WorkflowExecutionCanvas
          nodes={nodes}
          edges={executionWorkflowEdges}
        />
        </div>

        {/* Logs */}
        <ActiveLogs
          execution={execution}/>
      </section>

      {/* Right Timeline */}
      <ExecutionTimeline
        execution={execution}/>
    </main>
  );
}