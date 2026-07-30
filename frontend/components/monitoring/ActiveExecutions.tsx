import {
  CirclePlay,
  Hourglass,
  RotateCw,
} from "lucide-react";

import { ActiveExecution } from "@/types/monitoring";

interface ActiveExecutionsProps {
  executions: ActiveExecution[];
}

const statusConfig = {
  RUNNING: {
    label: "Running",
    className:
      "bg-cyan-500/10 text-cyan-400",
    icon: CirclePlay,
  },
  WAITING_APPROVAL: {
    label: "Waiting Approval",
    className:
      "bg-violet-500/10 text-violet-400",
    icon: Hourglass,
  },
  RETRYING: {
    label: "Retrying",
    className:
      "bg-orange-500/10 text-orange-400",
    icon: RotateCw,
  },
} as const;

export default function ActiveExecutions({
  executions,
}: ActiveExecutionsProps) {
  return (
    <section className="rounded-xl border bg-card p-5">
      <h2 className="text-lg font-semibold">
        Active Executions
      </h2>

      <div className="mt-5 space-y-3">
        {executions.map((execution) => {
          const status =
            statusConfig[execution.status];

          const Icon = status.icon;

          return (
            <div
              key={execution.id}
              className="rounded-lg border p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                    <Icon className="size-4" />
                  </div>

                  <div>
                    <h3 className="font-medium">
                      {execution.workflowName}
                    </h3>

                    <p className="text-xs text-muted-foreground">
                      ID: {execution.id}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-md px-2 py-1 text-xs ${status.className}`}
                >
                  {status.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="mt-5 w-full text-sm text-primary"
      >
        View all {executions.length} executions
      </button>
    </section>
  );
}