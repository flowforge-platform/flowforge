"use client";

import { Handle, Position } from "@xyflow/react";

export function StartNode() {
  return (
    <div className="rounded-xl border border-green-500 bg-zinc-900 px-6 py-4">
      <p className="font-medium">Start</p>

      <Handle
        type="source"
        position={Position.Right}
      />
    </div>
  );
}