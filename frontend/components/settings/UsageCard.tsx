"use client";

import { Progress } from "@/components/ui/progress";

import { UsageInfo } from "@/types/settings";

interface UsageCardProps {
  usage: UsageInfo;
}

export default function UsageCard({
  usage,
}: UsageCardProps) {
  return (
    <section className="rounded-xl border bg-card p-5">

      <h3 className="text-sm font-semibold">
        Usage Limit
      </h3>

      <Progress
        value={usage.percentage}
        className="mt-4"
      />

      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Used
        </span>

        <span className="font-medium">
          {usage.percentage}%
        </span>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        {usage.description}
      </p>

    </section>
  );
}