export interface WorkflowNode {
  clientId: string;
  nodeKey: string;
  nodeType: string;
  positionX: number;
  positionY: number;
  configuration: Record<string, unknown>;
}

export interface WorkflowEdge {
  sourceClientId: string;
  targetClientId: string;
}

export interface WorkflowDefinition {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

export type WorkflowNodeType =
  | "start"
  | "httpRequest"
  | "condition";