"use client";

import { Handle, Position } from "@xyflow/react";
import { Globe } from "lucide-react";

export function HttpRequestNode({
  data,
}: {
  data: {
    label: string;
    method: string;
    endpoint: string;
  };
}) {
  return (
    <div className="w-[250px] rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow-lg">
      <Handle
        type="target"
        position={Position.Left}
      />

      <div className="flex items-center gap-2">
        <Globe size={16} />
        <span className="font-medium">
          {data.label}
        </span>
      </div>

      <div className="mt-4 text-xs text-zinc-400">
        {data.method}
      </div>

      <div className="text-sm text-zinc-300">
        {data.endpoint}
      </div>

      <Handle
        type="source"
        position={Position.Right}
      />
    </div>
  );
}