"use client";

import {
  CheckCircle2,
  Clock3,
  Eye,
  RefreshCw,
  RotateCcw,
  XCircle,
} from "lucide-react";

import {
  Execution,
  ExecutionStatus,
} from "@/types/execution";

import { formatDuration } from "@/lib/utils/format-duration";
import { formatRelativeTime } from "@/lib/utils/format-relative-time";
import { ReactNode } from "react";

interface ExecutionTableProps {
  executions: Execution[];
  pagination?: ReactNode;
}

const statusConfig: Record<
  ExecutionStatus,
  {
    label: string;
    className: string;
    icon: typeof CheckCircle2;
  }
> = {
  RUNNING: {
    label: "Running",
    className: "bg-cyan-500/10 text-cyan-500",
    icon: RefreshCw,
  },

  FAILED: {
    label: "Failed",
    className: "bg-red-500/10 text-red-500",
    icon: XCircle,
  },

  COMPLETED: {
    label: "Completed",
    className: "bg-emerald-500/10 text-emerald-500",
    icon: CheckCircle2,
  },

  WAITING_APPROVAL: {
    label: "Waiting Approval",
    className: "bg-violet-500/10 text-violet-400",
    icon: Clock3,
  },

  RETRYING: {
    label: "Retrying",
    className: "bg-indigo-500/10 text-indigo-400",
    icon: RotateCcw,
  },
};

export default function ExecutionTable({
  executions,
  pagination
}: ExecutionTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead className="border-b bg-muted/30">
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-4 font-medium">
                Execution ID
              </th>

              <th className="px-5 py-4 font-medium">
                Workflow
              </th>

              <th className="px-5 py-4 font-medium">
                Status
              </th>

              <th className="px-5 py-4 font-medium">
                Progress
              </th>

              <th className="px-5 py-4 font-medium">
                Started
              </th>

              <th className="px-5 py-4 font-medium">
                Duration
              </th>

              <th className="px-5 py-4 font-medium">
                Node
              </th>

              <th className="px-5 py-4 text-right font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {executions.map((execution) => {
              const status = statusConfig[execution.status];
              const StatusIcon = status.icon;

              const progressPercentage =
                execution.progress.totalNodes === 0
                  ? 0
                  : Math.round(
                      (execution.progress.completedNodes /
                        execution.progress.totalNodes) *
                        100
                    );

              return (
                <tr
                  key={execution.id}
                  className="transition-colors hover:bg-muted/20"
                >
                  {/* Execution ID */}
                  <td className="px-5 py-5">
                    <span className="rounded-md bg-muted px-2 py-1 font-mono text-xs">
                      #{execution.id}
                    </span>
                  </td>

                  {/* Workflow */}
                  <td className="px-5 py-5">
                    <div className="max-w-[220px]">
                      <p className="font-medium">
                        {execution.workflow.name}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {execution.workflow.category}
                        {" · "}
                        {execution.workflow.source}
                      </p>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                    >
                      <StatusIcon className="size-3.5" />

                      {status.label}
                    </span>
                  </td>

                  {/* Progress */}
                  <td className="px-5 py-5">
                    <div className="w-28">
                      <div className="mb-2 flex items-center justify-between text-xs">
                        <span>
                          {execution.progress.completedNodes}/
                          {execution.progress.totalNodes} Nodes
                        </span>
                      </div>

                      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{
                            width: `${progressPercentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Started */}
                  <td className="px-5 py-5 text-sm text-muted-foreground">
                    {formatRelativeTime(execution.startedAt)}
                  </td>

                  {/* Duration */}
                  <td className="px-5 py-5 text-sm">
                    <div>
                      {formatDuration(execution.duration)}

                      {execution.retryCount > 0 && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Retry {execution.retryCount}
                        </p>
                      )}

                      {execution.status ===
                        "WAITING_APPROVAL" && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Paused
                        </p>
                      )}
                    </div>
                  </td>

                  {/* Current Node */}
                  <td className="px-5 py-5">
                    <span className="font-mono text-sm text-muted-foreground">
                      {execution.currentNode ?? "—"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-5">
                    <ExecutionActions execution={execution} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {executions.length === 0 && (
        <div className="flex min-h-60 items-center justify-center">
          <div className="text-center">
            <p className="font-medium">
              No executions found
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Try changing your filters.
            </p>
          </div>
        </div>
      )}
      {pagination}
    </div>
  );
}

interface ExecutionActionsProps {
  execution: Execution;
}

function ExecutionActions({
  execution,
}: ExecutionActionsProps) {
  return (
    <div className="flex items-center justify-end gap-2">
      {execution.status === "FAILED" && (
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
        >
          <RotateCcw className="size-3.5" />
          Retry
        </button>
      )}

      {execution.status === "WAITING_APPROVAL" && (
        <button
          type="button"
          className="rounded-md bg-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground"
        >
          Approve
        </button>
      )}

      <button
        type="button"
        aria-label={`View execution ${execution.id}`}
        className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Eye className="size-4" />
      </button>
    </div>
      
  );
}