import type { ExecutionTimelineItem } from "@/types/execution-details";
import { cn } from "@/lib/utils";

const timelineStatusConfig = {
  SUCCESS: {
    dot: "bg-green-500",
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

function TimelineItem({
  item,
  isLast,
}: TimelineItemProps) {
  const config =
    timelineStatusConfig[item.status];

  return (
    <div className="flex gap-4">

      <div className="flex flex-col items-center">

        <div
          className={cn(
            "h-3 w-3 rounded-full",
            config.dot
          )}
        />

        {!isLast && (
          <div className="mt-1 h-full w-px bg-border" />
        )}

      </div>

      <div className="pb-6">

        <div className="flex items-center gap-2">

          <p className="font-medium">
            {item.title}
          </p>

          <span className="text-xs text-muted-foreground">
            {item.timestamp}
          </span>

        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          {item.description}
        </p>

      </div>

    </div>
  );
}

import { ExecutionDetails } from "@/types/execution-details";

interface ExecutionTimelineProps {
  execution: ExecutionDetails;
}

export default function ExecutionTimeline({
  execution,
}: ExecutionTimelineProps) {
  return (
    <aside className="w-80 border-l p-5">

      <h2 className="mb-6 text-lg font-semibold">
        Timeline
      </h2>

      {execution.timeline.map(
        (item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            isLast={
              index ===
              execution.timeline.length - 1
            }
          />
        )
      )}

    </aside>
  );
}