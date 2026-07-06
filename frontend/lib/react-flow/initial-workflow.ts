import { Edge, Node } from "@xyflow/react";

export const initialNodes: Node[] = [
  {
    id: "start",
    type: "start",
    position: {
      x: 200,
      y: 200,
    },
    data: {
      label: "Start",
    },
  },
];

export const initialEdges: Edge[] = [];