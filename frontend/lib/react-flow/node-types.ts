import { HttpRequestNode } from "@/components/workflow-builder/nodes/http-request-node";
import { StartNode } from "@/components/workflow-builder/nodes/start-node";
import { ConditionNode } from "@/components/workflow-builder/nodes/condition-node";

export const nodeTypes = {
  start: StartNode,
  httpRequest: HttpRequestNode,
  condition: ConditionNode
};

export type ExecutionNodeStatus =
  | "SUCCESS"
  | "RUNNING"
  | "WAITING"
  | "FAILED"
  | "IDLE";

export interface WorkflowNodeData {
  label: string;
  executionStatus?: ExecutionNodeStatus;
}