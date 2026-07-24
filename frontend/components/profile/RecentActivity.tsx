"use client";

import { History } from "lucide-react";

import { Activity } from "@/types/profile";

import ActivityItem from "./ActivityItem";

interface RecentActivityProps {
  activities: Activity[];
}

export default function RecentActivity({
  activities,
}: RecentActivityProps) {
  return (
    <section className="rounded-xl border bg-card p-6">

      <div className="mb-8 flex items-center gap-2">

        <History className="size-5 text-primary" />

        <h2 className="text-lg font-semibold">
          Recent Activity
        </h2>

      </div>

      <div>

        {activities.map((activity, index) => (
          <ActivityItem
            key={activity.id}
            activity={activity}
            isLast={index === activities.length - 1}
          />
        ))}

      </div>

    </section>
  );
}