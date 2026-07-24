import {
  AlertTriangle,
  CheckCircle2,
  Info,
} from "lucide-react";

import { PlatformEvent } from "@/types/monitoring";
import { formatRelativeTime } from "@/lib/utils/format-relative-time";

interface RecentPlatformEventsProps {
  events: PlatformEvent[];
}

const eventConfig = {
  ERROR: {
    label: "Error",
    icon: AlertTriangle,
    dot: "bg-red-500",
    iconColor: "text-red-500",
  },

  WARNING: {
    label: "Warning",
    icon: AlertTriangle,
    dot: "bg-yellow-500",
    iconColor: "text-yellow-500",
  },

  INFO: {
    label: "Info",
    icon: Info,
    dot: "bg-sky-500",
    iconColor: "text-sky-500",
  },
} as const;

export default function RecentPlatformEvents({
  events,
}: RecentPlatformEventsProps) {
  return (
    <section className="rounded-xl border bg-card p-5">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Recent Platform Events
          </h2>

          <p className="text-sm text-muted-foreground">
            Latest infrastructure and workflow events
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {events.map((event) => {
          const config =
            eventConfig[event.type];

          const Icon = config.icon;

          return (
            <div
              key={event.id}
              className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/20"
            >
              {/* Status */}
              <div className="relative mt-1">
                <span
                  className={`absolute -left-0.5 -top-0.5 size-2 rounded-full ${config.dot}`}
                />

                <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                  <Icon
                    className={`size-4 ${config.iconColor}`}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-medium">
                    {event.title}
                  </h3>

                  <span className="whitespace-nowrap text-xs text-muted-foreground">
                    {formatRelativeTime(
                      event.timestamp
                    )}
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  {event.description}
                </p>
              </div>
            </div>
          );
        })}

        {events.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No recent platform events.
          </div>
        )}
      </div>
    </section>
  );
}