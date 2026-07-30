"use client";

import {
  Clock3,
  Pause,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { ExecutionDetails } from "@/types/execution-details";

interface ExecutionHeaderProps {
  execution: ExecutionDetails;
}

export default function ExecutionHeader({
  execution,
}: ExecutionHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6">

      {/* Left */}
      <div className="flex items-center gap-4">

        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Executions</span>

          <span>/</span>

          <span className="text-foreground">
            {execution.workflowName}
          </span>
        </nav>

        <div className="rounded-md border bg-muted/30 px-3 py-1 font-mono text-sm">
          ID: {execution.id}
        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-3">

        <div className="flex items-center gap-2 text-cyan-400">
          <Clock3 className="size-4" />

          <span className="font-mono">
            {execution.duration}
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
        >
          <Pause className="size-4" />

          Pause
        </Button>

        <Button
          variant="destructive"
          size="sm"
        >
          <X className="size-4" />

          Cancel
        </Button>

      </div>

    </header>
  );
}