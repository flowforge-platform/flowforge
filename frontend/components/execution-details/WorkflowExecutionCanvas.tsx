"use client";

import {
  Background,
  Controls,
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
      colorMode="dark"
    >
      <Controls
        position="bottom-left"
        className="!bg-[#161618] !border-[#2A2A2E] !rounded-lg !shadow-xl overflow-hidden [&>button]:!bg-[#161618] [&>button]:!border-b-[#2A2A2E] last:[&>button]:!border-b-0 [&>button]:!text-zinc-200 [&>button:hover]:!bg-[#242428] [&>button_svg]:!fill-zinc-200 [&>button_svg]:!stroke-zinc-200"
      />
      <Background color="#27272a" gap={16} />
    </ReactFlow>
  );
}