import { RunningExecution } from "@/types/dashboard";

interface RunningExecutionsProps {
  executions: RunningExecution[];
}

const statusConfig = {
  RUNNING: {
    label: "Running",
    className: "bg-blue-500/10 text-blue-500",
  },
  WAITING: {
    label: "Waiting",
    className: "bg-yellow-500/10 text-yellow-500",
  },
} as const;

export default function RunningExecutions({
  executions,
}: RunningExecutionsProps) {
  return (
    <section className="rounded-xl border bg-card p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">Running Executions</h2>

        <p className="text-sm text-muted-foreground">
          Currently active workflow executions
        </p>
      </div>

      <div className="space-y-4">
        {executions.map((execution) => {
          const status = statusConfig[execution.status] || statusConfig.RUNNING;

          return (
            <div
              key={execution.id}
              className="rounded-lg border p-4"
            >
              <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium">
                    {execution.workflowName}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Current step: {execution.currentStep}
                  </p>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                >
                  {status.label}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{execution.progress}%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{
                      width: `${execution.progress}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}

        {executions.length === 0 && (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No executions are currently running.
          </div>
        )}
      </div>
    </section>
  );
}