import { Edge, Node } from "@xyflow/react";

export type WorkflowNodeType =
  | "start"
  | "httpRequest"
  | "condition";

export interface BaseNodeData {
  label: string;
}

export interface StartNodeData extends BaseNodeData {}

export interface HttpRequestNodeData extends BaseNodeData {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  endpoint: string;
  timeout: number;
}

export interface ConditionNodeData extends BaseNodeData {
  condition: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;

  nodes: Node[];
  edges: Edge[];

  createdAt: string;
  updatedAt: string;
}