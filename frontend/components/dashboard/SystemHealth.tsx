import { SystemHealth as SystemHealthType } from "@/types/dashboard";

interface SystemHealthProps {
  health: SystemHealthType;
}

export default function SystemHealth({
  health,
}: SystemHealthProps) {
  const healthItems = [
    {
      label: "Success Rate",
      value: `${health.successRate}%`,
    },
    {
      label: "Failure Rate",
      value: `${health.failureRate}%`,
    },
    {
      label: "Retry Count",
      value: health.retryCount,
    },
    {
      label: "Active Instances",
      value: health.activeInstances,
    },
    {
      label: "Avg. Execution Time",
      value: `${health.averageExecutionTime}s`,
    },
    {
      label: "Resource Usage",
      value: health.resourceUsage,
    },
  ];

  return (
    <section className="rounded-xl border bg-card p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">System Health</h2>

        <p className="text-sm text-muted-foreground">
          Current workflow system metrics
        </p>
      </div>

      <div className="space-y-4">
        {healthItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0"
          >
            <span className="text-sm text-muted-foreground">
              {item.label}
            </span>

            <span className="text-sm font-semibold">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}