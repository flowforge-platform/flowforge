export interface WorkflowNode {
  clientId: string;
  nodeKey: string;
  nodeType: string;
  positionX: number;
  positionY: number;
  configuration: Record<string, unknown>;
}

export interface WorkflowNodeResponse {
  id: string;
  nodeKey: string;
  nodeType: string;
  positionX: number;
  positionY: number;
  configuration: Record<string, unknown>;
}

export interface WorkflowDefinitionResponse {
  nodes: WorkflowNodeResponse[];
  edges: WorkflowEdgeResponse[];
}

export interface WorkflowEdge {
  sourceClientId: string;
  targetClientId: string;
}

export interface WorkflowEdgeResponse {
  sourceNodeId: string;
  targetNodeId: string;
}

export interface WorkflowDefinition {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

export type WorkflowNodeType =
  | "start"
  | "end"
  | "httpRequest"
  | "condition";