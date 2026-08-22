"use client";

import { Handle, Position } from "@xyflow/react";
import { Globe } from "lucide-react";
import { getNodeStatusStyle } from "@/lib/react-flow/node-types";

export function HttpRequestNode({
  data,
}: {
  data: {
    label: string;
    method: string;
    endpoint: string;
    executionStatus?: string;
  };
}) {
  const borderClass = getNodeStatusStyle(
    data?.executionStatus,
    "border-zinc-800"
  );

  return (
    <div className={`w-[250px] rounded-xl border bg-zinc-900 p-4 shadow-lg ${borderClass}`}>
      <Handle
        type="target"
        position={Position.Left}
      />

      <div className="flex items-center gap-2 min-w-0">
        <Globe size={16} className="shrink-0" />
        <span className="font-medium truncate min-w-0" title={data.label}>
          {data.label}
        </span>
      </div>

      <div className="mt-4 text-xs text-zinc-400">
        {data.method}
      </div>

      <div
        className="mt-1 w-full min-w-0 truncate text-sm text-zinc-300"
        title={data.endpoint}
      >
        {data.endpoint}
      </div>

      <Handle
        type="source"
        position={Position.Right}
      />
    </div>
  );
}