import { Node, XYPosition } from "@xyflow/react";
import { WorkflowNodeType } from "@/types/workflow-definition";

export function createNode(
  type: WorkflowNodeType, position: XYPosition
): Node {
  switch (type) {
    case "start":
      return {
        id: crypto.randomUUID(),
        type,
        position,
        data: {
          label: "Start",
        },
      };

    case "end":
      return {
        id: crypto.randomUUID(),
        type,
        position,
        data: {
          label: "End",
        },
      };

    case "httpRequest":
      return {
        id: crypto.randomUUID(),
        type,
        position,
        data: {
          label: "HTTP Request",
          method: "GET",
          endpoint: "",
          timeout: 5000,
        },
      };

    case "condition":
      return {
        id: crypto.randomUUID(),
        type,
        position,
        data: {
          label: "Condition",
          condition: "",
        },
      };
  }
}