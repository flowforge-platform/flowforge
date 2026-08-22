"use client";

import { useState } from "react";
import type { ExecutionTimelineItem, ExecutionDetails } from "@/types/execution-details";
import { cn } from "@/lib/utils";

const timelineStatusConfig = {
  SUCCESS: {
    dot: "bg-green-500",
  },
  RUNNING: {
    dot: "bg-blue-500",
  },
  PENDING: {
    dot: "bg-zinc-500",
  },
  WAITING: {
    dot: "bg-amber-500",
  },
  FAILED: {
    dot: "bg-red-500",
  },
} as const;

interface TimelineItemProps {
  item: ExecutionTimelineItem;
  isLast: boolean;
}

function TimelineItem({ item, isLast }: TimelineItemProps) {
  const [showDetails, setShowDetails] = useState(false);
  const config =
    timelineStatusConfig[item.status] || timelineStatusConfig.SUCCESS;

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={cn("h-3 w-3 rounded-full mt-1.5", config.dot)} />

        {!isLast && <div className="mt-1 h-full w-px bg-border" />}
      </div>

      <div className="pb-6 min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="font-medium text-sm text-foreground">{item.title}</p>

          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {item.timestamp}
          </span>
        </div>

        {item.description && (
          <p className="mt-1 text-xs text-muted-foreground break-words">
            {item.description}
          </p>
        )}

        {item.status === "FAILED" && item.errorMessage && (
          <div className="mt-2">
            <button
              type="button"
              onClick={() => setShowDetails((prev) => !prev)}
              className="text-xs font-medium text-destructive hover:underline focus:outline-none"
            >
              {showDetails ? "Hide full error" : "View full error"}
            </button>

            {showDetails && (
              <pre className="mt-1.5 max-h-40 overflow-y-auto whitespace-pre-wrap rounded-md border border-destructive/20 bg-destructive/10 p-2 font-mono text-[11px] text-destructive">
                {item.errorMessage}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface ExecutionTimelineProps {
  execution: ExecutionDetails;
}

export default function ExecutionTimeline({
  execution,
}: ExecutionTimelineProps) {
  return (
    <aside className="w-80 border-l p-5 overflow-y-auto">
      <h2 className="mb-6 text-lg font-semibold">Timeline</h2>

      {execution.timeline.map((item, index) => (
        <TimelineItem
          key={item.id}
          item={item}
          isLast={index === execution.timeline.length - 1}
        />
      ))}
    </aside>
  );
}