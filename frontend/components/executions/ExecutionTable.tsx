"use client";

import {
  CheckCircle2,
  Clock3,
  Eye,
  RefreshCw,
  XCircle,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Execution } from "@/types/execution";
import { formatDuration } from "@/lib/utils/format-duration";
import { formatRelativeTime } from "@/lib/utils/format-relative-time";
import { ReactNode } from "react";

interface ExecutionTableProps {
  executions: Execution[];
  totalExecutionsCount?: number;
  onClearFilters?: () => void;
  pagination?: ReactNode;
}

const statusConfig: Record<
  string,
  {
    label: string;
    className: string;
    icon: typeof CheckCircle2;
  }
> = {
  PENDING: {
    label: "Pending",
    className: "bg-amber-500/10 text-amber-500",
    icon: Clock3,
  },
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
};

export default function ExecutionTable({
  executions,
  totalExecutionsCount,
  onClearFilters,
  pagination,
}: ExecutionTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="border-b bg-muted/30">
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-4 font-medium">Execution ID</th>
              <th className="px-5 py-4 font-medium">Workflow</th>
              <th className="px-5 py-4 font-medium">Status</th>
              <th className="px-5 py-4 font-medium">Started At</th>
              <th className="px-5 py-4 font-medium">Completed At</th>
              <th className="px-5 py-4 font-medium">Duration</th>
              <th className="px-5 py-4 text-right font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {executions.map((execution) => {
              const statusKey = (execution.status || "PENDING").toUpperCase();
              const status = statusConfig[statusKey] || {
                label: execution.status,
                className: "bg-muted text-muted-foreground",
                icon: Clock3,
              };
              const StatusIcon = status.icon;

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

                  {/* Workflow Name */}
                  <td className="px-5 py-5">
                    <p className="font-medium">{execution.workflow.name}</p>
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

                  {/* Started At */}
                  <td className="px-5 py-5 text-sm text-muted-foreground">
                    {execution.startedAt
                      ? formatRelativeTime(execution.startedAt)
                      : "—"}
                  </td>

                  {/* Completed At */}
                  <td className="px-5 py-5 text-sm text-muted-foreground">
                    {execution.completedAt
                      ? formatRelativeTime(execution.completedAt)
                      : "—"}
                  </td>

                  {/* Duration */}
                  <td className="px-5 py-5 text-sm text-muted-foreground">
                    {execution.duration !== null
                      ? formatDuration(execution.duration)
                      : "—"}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-5 text-right">
                    <Link
                      href={`/executions/${execution.id}`}
                      className="inline-flex rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      aria-label={`View execution ${execution.id}`}
                    >
                      <Eye className="size-4" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {executions.length === 0 && (
        <div className="flex min-h-60 items-center justify-center p-6 text-center">
          <div className="space-y-2">
            {totalExecutionsCount && totalExecutionsCount > 0 ? (
              <>
                <p className="font-medium text-foreground">
                  No executions match the selected filters
                </p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting or clearing your filters to see more results.
                </p>
                {onClearFilters && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onClearFilters}
                    className="mt-2"
                  >
                    Clear Filters
                  </Button>
                )}
              </>
            ) : (
              <>
                <p className="font-medium text-foreground">
                  No executions found
                </p>
                <p className="text-sm text-muted-foreground">
                  Trigger a workflow execution to see history here.
                </p>
              </>
            )}
          </div>
        </div>
      )}
      {pagination}
    </div>
  );
}