import {
  Activity,
  Gauge,
  HeartPulse,
  Timer,
} from "lucide-react";

import { ExecutionMetrics as ExecutionMetricsType } from "@/types/execution";

interface ExecutionMetricsProps {
  metrics: ExecutionMetricsType;
}

export default function ExecutionMetrics({
  metrics,
}: ExecutionMetricsProps) {
  const metricCards = [
    {
      label: "Active Threads",
      value: metrics.activeThreads.toLocaleString(),
      detail: `+${metrics.activeThreadsChange}%`,
      icon: Activity,
    },
    {
      label: "Success Rate",
      value: `${metrics.successRate}%`,
      detail: "Stable",
      icon: Gauge,
    },
    {
      label: "Avg. Latency",
      value: `${metrics.averageLatency}ms`,
      detail: `${metrics.latencyChange}s`,
      icon: Timer,
    },
    {
      label: "System Health",
      value: formatSystemHealth(
        metrics.systemHealth
      ),
      detail: "All systems operational",
      icon: HeartPulse,
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metricCards.map((metric) => {
        const Icon = metric.icon;

        return (
          <div
            key={metric.label}
            className="rounded-xl border bg-card p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {metric.label}
                </p>

                <div className="mt-3 flex items-end gap-2">
                  <p className="text-2xl font-semibold tracking-tight">
                    {metric.value}
                  </p>

                  <span className="mb-1 text-xs text-muted-foreground">
                    {metric.detail}
                  </span>
                </div>
              </div>

              <div className="rounded-lg bg-muted p-2">
                <Icon className="size-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

function formatSystemHealth(
  health: ExecutionMetricsType["systemHealth"]
) {
  const labels = {
    OPTIMAL: "Optimal",
    DEGRADED: "Degraded",
    CRITICAL: "Critical",
  };

  return labels[health];
}