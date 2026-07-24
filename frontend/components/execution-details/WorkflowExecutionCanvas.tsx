"use client";

import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type Node,
  type Edge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { nodeTypes } from "@/lib/react-flow/node-types";

interface WorkflowExecutionCanvasProps {
  nodes: Node[];
  edges: Edge[];
}

export default function WorkflowExecutionCanvas({
  nodes,
  edges,
}: WorkflowExecutionCanvasProps) {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      nodesDraggable={false}
      nodesConnectable={false}
      nodesFocusable={false}
      edgesFocusable={false}
      connectOnClick={false}
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
}