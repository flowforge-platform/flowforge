import { Edge, Node } from "@xyflow/react";
import {
  WorkflowDefinition,
  WorkflowEdge,
  WorkflowNode,
  WorkflowNodeType,
  WorkflowDefinitionResponse,
} from "@/types/workflow-definition";

const NODE_TYPE_MAP: Record<WorkflowNodeType, string> = {
  start: "START",
  end: "END",
  httpRequest: "HTTP_REQUEST",
  condition: "CONDITION",
};

const REVERSE_NODE_TYPE_MAP = {
  START: "start",
  END: "end",
  HTTP_REQUEST: "httpRequest",
  CONDITION: "condition",
} as const;

export const toWorkflowDefinition = (
  nodes: Node[],
  edges: Edge[]
): WorkflowDefinition => {
  return {
    nodes: nodes.map((node): WorkflowNode => ({
      clientId: node.id,

      nodeKey: node.id,

      nodeType:
        NODE_TYPE_MAP[
        node.type as WorkflowNodeType
        ],

      positionX: node.position.x,
      positionY: node.position.y,

      configuration: node.data,
    })),

    edges: edges.map((edge): WorkflowEdge => ({
      sourceClientId: edge.source,
      targetClientId: edge.target,
    })),
  };
};

export const fromWorkflowDefinition = (
  definition: WorkflowDefinitionResponse
): {
  nodes: Node[];
  edges: Edge[];
} => {
  return {
    nodes: definition.nodes.map((node): Node => ({
      id: node.id,

      type:
        REVERSE_NODE_TYPE_MAP[
        node.nodeType as keyof typeof REVERSE_NODE_TYPE_MAP
        ],

      position: {
        x: node.positionX,
        y: node.positionY,
      },

      data: node.configuration,
    })),

    edges: definition.edges.map((edge): Edge => ({
      id: `${edge.sourceNodeId}-${edge.targetNodeId}`,

      source: edge.sourceNodeId,
      target: edge.targetNodeId,
    })),
  };
};