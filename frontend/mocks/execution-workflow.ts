import { Edge, Node } from "@xyflow/react";

export const executionWorkflowNodes: Node[] = [
  {
    id: "start",
    type: "start",
    position: { x: 100, y: 220 },
    data: {
      label: "Start",
    },
  },
  {
    id: "fetch-profile",
    type: "httpRequest",
    position: { x: 350, y: 220 },
    data: {
      label: "Fetch Profile",
    },
  },
  {
    id: "approval",
    type: "condition",
    position: { x: 650, y: 220 },
    data: {
      label: "Manager Approval",
    },
  },
  {
    id: "notify",
    type: "httpRequest",
    position: { x: 950, y: 220 },
    data: {
      label: "Send Notification",
    },
  },
  {
    id: "finish",
    type: "httpRequest",
    position: { x: 1250, y: 220 },
    data: {
      label: "Complete",
    },
  },
];

export const executionWorkflowEdges: Edge[] = [
  {
    id: "e1",
    source: "start",
    target: "fetch-profile",
  },
  {
    id: "e2",
    source: "fetch-profile",
    target: "approval",
  },
  {
    id: "e3",
    source: "approval",
    target: "notify",
  },
  {
    id: "e4",
    source: "notify",
    target: "finish",
  },
];