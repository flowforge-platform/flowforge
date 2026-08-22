import { HttpRequestNode } from "@/components/workflow-builder/nodes/http-request-node";
import { StartNode } from "@/components/workflow-builder/nodes/start-node";
import { EndNode } from "@/components/workflow-builder/nodes/end-node";
import { ConditionNode } from "@/components/workflow-builder/nodes/condition-node";

export const nodeTypes = {
  start: StartNode,
  end: EndNode,
  httpRequest: HttpRequestNode,
  condition: ConditionNode,
};

export type ExecutionNodeStatus =
  | "SUCCESS"
  | "RUNNING"
  | "WAITING"
  | "FAILED"
  | "PENDING"
  | "IDLE";

export interface WorkflowNodeData {
  label: string;
  executionStatus?: ExecutionNodeStatus;
}

export function getNodeStatusStyle(
  executionStatus?: string,
  defaultBorder: string = "border-zinc-800"
): string {
  if (!executionStatus) return defaultBorder;
  const s = executionStatus.toUpperCase();
  switch (s) {
    case "SUCCESS":
    case "COMPLETED":
      return "border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.25)]";
    case "FAILED":
      return "border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.25)]";
    case "RUNNING":
      return "border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.25)] animate-pulse";
    case "WAITING":
      return "border-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.25)]";
    case "PENDING":
    case "IDLE":
    default:
      return "border-zinc-700";
  }
}