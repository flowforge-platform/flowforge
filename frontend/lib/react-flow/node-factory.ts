import { Node, XYPosition } from "@xyflow/react";

export function createNode(
  type: "start" | "httpRequest" | "condition", position : XYPosition
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