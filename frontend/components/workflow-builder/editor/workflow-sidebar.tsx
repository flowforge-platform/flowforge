"use client";

import { useWorkflowStore } from "@/lib/stores/workflow-store";
import { NODE_LIBRARY } from "@/lib/react-flow/node-library";

import { NodePaletteCard } from "../sidebar/node-pallette-card";

export function WorkflowSidebar() {
  const { addNode } = useWorkflowStore();
  
  
  return (
    <div className="h-full overflow-y-auto p-4">
      <h2 className="mb-4 text-lg font-semibold">
        Add Nodes
      </h2>

      <div className="space-y-3">
        {NODE_LIBRARY.map((node) => (
          <NodePaletteCard
            key={node.type}
            type={node.type}
            title={node.title}
            description={node.description}
            icon={node.icon}
          />
        ))}
      </div>
    </div>
  );
}