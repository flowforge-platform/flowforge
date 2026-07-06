"use client";

import {
  Handle,
  Position,
} from "@xyflow/react";
import { GitBranch } from "lucide-react";

export function ConditionNode({
  data,
}: {
  data: {
    label: string;
    condition: string;
  };
}) {
  return (
    <div className="w-[260px] rounded-xl border border-yellow-500/50 bg-zinc-900 p-4">
      <Handle
        type="target"
        position={Position.Left}
      />

      <div className="flex items-center gap-2">
        <GitBranch size={16} />
        <span className="font-medium">
          {data.label}
        </span>
      </div>

      <div className="mt-4 text-sm text-zinc-400">
        {data.condition}
      </div>

      <Handle
        id="true"
        type="source"
        position={Position.Right}
        style={{
          top: "35%",
        }}
      />

      <Handle
        id="false"
        type="source"
        position={Position.Right}
        style={{
          top: "70%",
        }}
      />
    </div>
  );
}