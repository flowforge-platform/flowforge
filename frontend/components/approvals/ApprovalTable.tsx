"use client";

import {
  CheckCircle2,
  ChevronRight,
  Clock3,
  XCircle,
} from "lucide-react";

import {
  Approval,
  ApprovalPriority,
  ApprovalStatus,
} from "@/types/approval";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { formatRelativeTime } from "@/lib/utils/format-relative-time";

interface ApprovalTableProps {
  approvals: Approval[];
  onRowClick: (approval: Approval) => void;
}

const priorityConfig: Record<
  ApprovalPriority,
  {
    label: string;
    className: string;
  }
> = {
  HIGH: {
    label: "High",
    className:
      "border-red-500/20 bg-red-500/10 text-red-400",
  },

  MEDIUM: {
    label: "Medium",
    className:
      "border-violet-500/20 bg-violet-500/10 text-violet-400",
  },

  LOW: {
    label: "Low",
    className:
      "border-muted bg-muted/50 text-muted-foreground",
  },
};

const statusConfig: Record<
  ApprovalStatus,
  {
    label: string;
    className: string;
    icon: typeof Clock3;
  }
> = {
  WAITING_APPROVAL: {
    label: "Waiting Approval",
    className: "text-cyan-400",
    icon: Clock3,
  },

  APPROVED: {
    label: "Approved",
    className: "text-violet-400",
    icon: CheckCircle2,
  },

  REJECTED: {
    label: "Rejected",
    className: "text-red-400",
    icon: XCircle,
  },
};

export default function ApprovalTable({
  approvals,
  onRowClick
}: ApprovalTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead className="border-b bg-muted/30">
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-4 font-medium">
                Workflow Name
              </th>

              <th className="px-5 py-4 font-medium">
                Requested By
              </th>

              <th className="px-5 py-4 font-medium">
                Current Step
              </th>

              <th className="px-5 py-4 font-medium">
                Requested Time
              </th>

              <th className="px-5 py-4 font-medium">
                Priority
              </th>

              <th className="px-5 py-4 font-medium">
                Status
              </th>

              <th
                className="w-16 px-5 py-4"
                aria-label="Actions"
              />
            </tr>
          </thead>

          <tbody className="divide-y">
            {approvals.map((approval) => {
              const priority =
                priorityConfig[approval.priority];

              const status =
                statusConfig[approval.status];

              const StatusIcon = status.icon;

              return (
                <tr
                  key={approval.id}
                  onClick={() => onRowClick(approval)}
                  className="cursor-pointer transition-colors hover:bg-muted/20"
                >
                  {/* Workflow */}
                  <td className="px-5 py-5">
                    <div>
                      <p className="font-medium">
                        {approval.workflow.name}
                      </p>

                      <p className="mt-1 font-mono text-xs text-muted-foreground">
                        {approval.id}
                      </p>
                    </div>
                  </td>

                  {/* Requested By */}
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <RequesterAvatar
                        name={approval.requestedBy.name}
                      />

                      <span className="text-sm">
                        {approval.requestedBy.name}
                      </span>
                    </div>
                  </td>

                  {/* Current Step */}
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="size-1.5 shrink-0 rounded-full bg-primary" />

                      {approval.currentStep}
                    </div>
                  </td>

                  {/* Requested Time */}
                  <td className="px-5 py-5 text-sm text-muted-foreground">
                    {formatRelativeTime(
                      approval.requestedAt
                    )}
                  </td>

                  {/* Priority */}
                  <td className="px-5 py-5">
                    <span
                      className={`inline-flex rounded-md border px-2 py-1 text-[10px] font-medium uppercase tracking-wider ${priority.className}`}
                    >
                      {priority.label}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-5">
                    <div
                      className={`inline-flex items-center gap-2 text-sm font-medium ${status.className}`}
                    >
                      <StatusIcon className="size-4" />

                      {status.label}
                    </div>
                  </td>

                  {/* Action */}
                  <td className="px-5 py-5 text-right">
                    <ChevronRight className="ml-auto size-4 text-muted-foreground" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {approvals.length === 0 && (
        <div className="flex min-h-60 items-center justify-center">
          <div className="text-center">
            <p className="font-medium">
              No approvals found
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              There are no approval requests matching this filter.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function RequesterAvatar({
  name,
}: {
  name: string;
}) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Avatar className="size-8">
      <AvatarFallback className="text-xs">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}