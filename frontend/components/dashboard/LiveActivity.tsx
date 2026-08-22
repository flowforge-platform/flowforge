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
  className?: string;
}

const activityConfig: Record<
  ActivityType,
  {
    icon: typeof ActivityIcon;
    label: string;
    iconClassName: string;
    bgClassName: string;
  }
> = {
  APPROVAL_REQUESTED: {
    icon: Clock3,
    label: "Approval Requested",
    iconClassName: "text-amber-400",
    bgClassName: "bg-amber-500/10 border border-amber-500/20",
  },
  EXECUTION_COMPLETED: {
    icon: CheckCircle2,
    label: "Execution Completed",
    iconClassName: "text-emerald-400",
    bgClassName: "bg-emerald-500/10 border border-emerald-500/20",
  },
  EXECUTION_STARTED: {
    icon: Play,
    label: "Execution Started",
    iconClassName: "text-sky-400 fill-sky-400/20",
    bgClassName: "bg-sky-500/10 border border-sky-500/20",
  },
  EXECUTION_FAILED: {
    icon: CircleAlert,
    label: "Execution Failed",
    iconClassName: "text-red-400",
    bgClassName: "bg-red-500/10 border border-red-500/20",
  },
};

export default function LiveActivity({
  activities,
  className = "",
}: LiveActivityProps) {
  return (
    <section
      className={`flex flex-col max-h-[380px] rounded-xl border bg-card p-5 ${className}`}
    >
      <div className="mb-4 shrink-0">
        <h2 className="text-lg font-semibold">Live Activity</h2>
        <p className="text-sm text-muted-foreground">
          Latest activity across your workflows
        </p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto pr-1.5 space-y-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-700/60 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-zinc-500 [scrollbar-width:thin] [scrollbar-color:rgba(63,63,70,0.6)_transparent]">
        {activities.map((activity) => {
          const config = activityConfig[activity.type];
          const Icon = config.icon;

          return (
            <div
              key={activity.id}
              className="flex gap-3 rounded-lg p-3 hover:bg-muted/50 transition-colors"
            >
              <div className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full ${config.bgClassName}`}>
                <Icon className={`size-4 ${config.iconClassName}`} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">
                  {config.label}
                </p>

                <p className="mt-1 text-sm text-muted-foreground truncate">
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

