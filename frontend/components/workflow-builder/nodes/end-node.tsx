"use client";

import { Handle, Position } from "@xyflow/react";
import { Square } from "lucide-react";
import { getNodeStatusStyle } from "@/lib/react-flow/node-types";

export function EndNode({
  data,
}: {
  data?: {
    executionStatus?: string;
  };
}) {
  const borderClass = getNodeStatusStyle(
    data?.executionStatus,
    "border-red-500"
  );

  const statusUpper = (data?.executionStatus || "").toUpperCase();
  let iconColorClass = "fill-red-400 text-red-400";
  if (statusUpper === "SUCCESS" || statusUpper === "COMPLETED") {
    iconColorClass = "fill-emerald-400 text-emerald-400";
  } else if (statusUpper === "FAILED") {
    iconColorClass = "fill-red-400 text-red-400";
  } else if (statusUpper === "RUNNING") {
    iconColorClass = "fill-blue-400 text-blue-400";
  } else if (statusUpper === "WAITING") {
    iconColorClass = "fill-amber-400 text-amber-400";
  } else if (statusUpper === "PENDING" || statusUpper === "IDLE") {
    iconColorClass = "fill-zinc-400 text-zinc-400";
  }

  return (
    <div className={`rounded-xl border bg-zinc-900 px-6 py-4 ${borderClass}`}>
      <Handle
        type="target"
        position={Position.Left}
      />

      <div className="flex items-center gap-2">
        <Square size={16} className={iconColorClass} />
        <p className="font-medium">End</p>
      </div>
    </div>
  );
}
