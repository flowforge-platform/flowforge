"use client";

import { Handle, Position } from "@xyflow/react";
import { getNodeStatusStyle } from "@/lib/react-flow/node-types";

export function StartNode({
  data,
}: {
  data?: {
    executionStatus?: string;
  };
}) {
  const borderClass = getNodeStatusStyle(
    data?.executionStatus,
    "border-green-500"
  );

  return (
    <div className={`rounded-xl border bg-zinc-900 px-6 py-4 ${borderClass}`}>
      <p className="font-medium">Start</p>

      <Handle
        type="source"
        position={Position.Right}
      />
    </div>
  );
}