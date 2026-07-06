import { Edge, Node } from "@xyflow/react";

export interface ValidationError {
  message: string;
  nodeId?: string;
}

export function validateWorkflow(
  nodes: Node[],
  edges: Edge[]
): ValidationError[] {
  const errors: ValidationError[] = [];

  const startNodes = nodes.filter(
    (node) => node.type === "start"
  );

  if (startNodes.length === 0) {
    errors.push({
      message: "Workflow must have a Start node.",
    });
  }

  if (startNodes.length > 1) {
    errors.push({
      message: "Only one Start node is allowed.",
    });
  }

  nodes.forEach((node) => {
    if (node.type === "httpRequest") {
      const data = node.data as any;

      if (!data.endpoint) {
        errors.push({
          nodeId: node.id,
          message: `${data.label} has no endpoint.`,
        });
      }
    }
  });

  nodes.forEach((node) => {
    if (node.type === "condition") {
      const data = node.data as any;

      if (!data.condition) {
        errors.push({
          nodeId: node.id,
          message: `${data.label} has no condition.`,
        });
      }
    }
  });

  return errors;
}