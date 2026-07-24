import {
  Activity as ActivityIcon,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Play,
} from "lucide-react";

import { Activity, ActivityType } from "@/types/dashboard";
import { formatRelativeTime } from "@/lib/utils/format-relative-time";

interface LiveActivityProps {
  activities: Activity[];
}

const activityConfig: Record<
  ActivityType,
  {
    icon: typeof ActivityIcon;
    label: string;
  }
> = {
  APPROVAL_REQUESTED: {
    icon: Clock3,
    label: "Approval Requested",
  },
  EXECUTION_COMPLETED: {
    icon: CheckCircle2,
    label: "Execution Completed",
  },
  EXECUTION_STARTED: {
    icon: Play,
    label: "Execution Started",
  },
  EXECUTION_FAILED: {
    icon: CircleAlert,
    label: "Execution Failed",
  },
};

export default function LiveActivity({
  activities,
}: LiveActivityProps) {
  return (
    <section className="rounded-xl border bg-card p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">Live Activity</h2>
        <p className="text-sm text-muted-foreground">
          Latest activity across your workflows
        </p>
      </div>

      <div className="space-y-1">
        {activities.map((activity) => {
          const config = activityConfig[activity.type];
          const Icon = config.icon;

          return (
            <div
              key={activity.id}
              className="flex gap-3 rounded-lg p-3 hover:bg-muted/50"
            >
              <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
                <Icon className="size-4" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">
                  {config.label}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {activity.message}
                </p>

                <p className="mt-2 text-xs text-muted-foreground">
                  {formatRelativeTime(activity.createdAt)}
                </p>
              </div>
            </div>
          );
        })}

        {activities.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No recent activity.
          </p>
        )}
      </div>
    </section>
  );
}
