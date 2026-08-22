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
      badgeClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "Failure Rate",
      value: `${health.failureRate}%`,
      badgeClass:
        health.failureRate > 0
          ? "text-red-400 bg-red-500/10 border-red-500/20"
          : "text-zinc-400 bg-zinc-800/50 border-zinc-700/30",
    },
    {
      label: "Active Instances",
      value: health.activeInstances,
      badgeClass: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    },
    {
      label: "Avg. Execution Time",
      value: `${health.averageExecutionTime}s`,
      badgeClass: "text-zinc-300 bg-zinc-800/40 border-zinc-700/30",
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
            className="flex items-center justify-between border-b border-border/50 pb-3 last:border-b-0 last:pb-0"
          >
            <span className="text-sm text-muted-foreground">
              {item.label}
            </span>

            <span
              className={`rounded-md border px-2.5 py-0.5 text-xs font-semibold ${item.badgeClass}`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
