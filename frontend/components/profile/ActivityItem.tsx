"use client";

import {
  Activity,
  CheckCircle2,
  User,
  Workflow,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Activity as ProfileActivity } from "@/types/profile";

interface ActivityItemProps {
  activity: ProfileActivity;
  isLast: boolean;
}

const activityConfig = {
  workflow: {
    icon: Workflow,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  execution: {
    icon: Activity,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  approval: {
    icon: CheckCircle2,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  profile: {
    icon: User,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
};

export default function ActivityItem({
  activity,
  isLast,
}: ActivityItemProps) {
  const config = activityConfig[activity.type];
  const Icon = config.icon;

  return (
    <div className="flex gap-4">

      <div className="flex flex-col items-center">

        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full",
            config.bg
          )}
        >
          <Icon
            className={cn(
              "size-5",
              config.color
            )}
          />
        </div>

        {!isLast && (
          <div className="mt-2 h-full w-px bg-border" />
        )}

      </div>

      <div className="pb-8">

        <div className="flex items-center gap-3">

          <h3 className="font-semibold">
            {activity.title}
          </h3>

          <span className="text-sm text-muted-foreground">
            {activity.timestamp}
          </span>

        </div>

        <p className="mt-2 text-sm text-muted-foreground">
          {activity.description}
        </p>

      </div>

    </div>
  );
}