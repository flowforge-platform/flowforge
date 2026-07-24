import {
  Clock3,
  ClipboardCheck,
  TrendingUp,
} from "lucide-react";

import { ApprovalMetrics as ApprovalMetricsType } from "@/types/approval";

interface ApprovalMetricsProps {
  metrics: ApprovalMetricsType;
}

export default function ApprovalMetrics({
  metrics,
}: ApprovalMetricsProps) {
  const metricCards = [
    {
      label: "Approval Rate",
      value: `${metrics.approvalRate}%`,
      icon: TrendingUp,
    },
    {
      label: "Avg. Time to Resolve",
      value: `${metrics.averageResolutionTime}h`,
      icon: Clock3,
    },
    {
      label: "Delegated Tasks",
      value: metrics.delegatedTasks
        .toString()
        .padStart(2, "0"),
      icon: ClipboardCheck,
    },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {metricCards.map((metric) => {
        const Icon = metric.icon;

        return (
          <div
            key={metric.label}
            className="rounded-xl border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {metric.label}
                </p>

                <p className="mt-2 text-2xl font-semibold tracking-tight">
                  {metric.value}
                </p>
              </div>

              <div className="flex size-11 items-center justify-center rounded-full bg-muted">
                <Icon className="size-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}