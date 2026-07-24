import {
  Activity,
  CheckCircle2,
  RefreshCcw,
  Timer,
  Workflow,
  XCircle,
} from "lucide-react";

import { MonitoringMetrics as Metrics } from "@/types/monitoring";

interface MonitoringMetricsProps {
  metrics: Metrics;
}

export default function MonitoringMetrics({
  metrics,
}: MonitoringMetricsProps) {
  const cards = [
    {
      title: "Active Workflows",
      value: metrics.activeWorkflows,
      icon: Workflow,
    },
    {
      title: "Throughput",
      value: `${metrics.throughput}/min`,
      icon: Activity,
    },
    {
      title: "Success Rate",
      value: `${metrics.successRate}%`,
      icon: CheckCircle2,
    },
    {
      title: "Failure Rate",
      value: `${metrics.failureRate}%`,
      icon: XCircle,
    },
    {
      title: "Retry Count",
      value: metrics.retryCount,
      icon: RefreshCcw,
    },
    {
      title: "Avg Exec Time",
      value: `${metrics.averageExecutionTime}s`,
      icon: Timer,
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-xl border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {card.title}
                </p>

                <p className="mt-3 text-3xl font-semibold">
                  {card.value}
                </p>
              </div>

              <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                <Icon className="size-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}