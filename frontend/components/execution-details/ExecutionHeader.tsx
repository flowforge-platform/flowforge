"use client";

import { Clock3 } from "lucide-react";
import { ExecutionDetails } from "@/types/execution-details";

interface ExecutionHeaderProps {
  execution: ExecutionDetails;
}

const statusStyles: Record<string, string> = {
  COMPLETED: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  RUNNING: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  FAILED: "bg-destructive/10 text-destructive border-destructive/20",
  WAITING: "bg-amber-500/10 text-amber-500 border-amber-500/20",
};

export default function ExecutionHeader({
  execution,
}: ExecutionHeaderProps) {
  const statusClass =
    statusStyles[execution.status?.toUpperCase()] ||
    "bg-muted text-muted-foreground border-border";

  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Executions</span>
          <span>/</span>
          <span className="text-foreground">{execution.workflowName}</span>
        </nav>

        <div className="rounded-md border bg-muted/30 px-3 py-1 font-mono text-sm">
          ID: {execution.id}
        </div>

        <div
          className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${statusClass}`}
        >
          {execution.status}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-cyan-400">
          <Clock3 className="size-4" />
          <span className="font-mono">{execution.duration}</span>
        </div>
      </div>
    </header>
  );
}