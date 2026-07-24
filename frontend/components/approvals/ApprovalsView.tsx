"use client";

import { useMemo, useState } from "react";

import {
  Approval,
  ApprovalFilter,
  ApprovalsData,
} from "@/types/approval";

import ApprovalFilters from "./ApprovalsFilters";
import ApprovalTable from "./ApprovalTable";
import ApprovalMetrics from "./ApprovalMetrics";
import ApprovalDetailsOverlay from "./ApprovalDetailsOverlay";

interface ApprovalsViewProps {
  data: ApprovalsData;
}


export default function ApprovalsView({
  data,
}: ApprovalsViewProps) {
  const [filter, setFilter] =
    useState<ApprovalFilter>("ALL");


  const [selectedApproval, setSelectedApproval] =
    useState<Approval | null>(null);

  const filteredApprovals = useMemo(() => {
    return data.approvals.filter((approval) => {
      if (filter === "URGENT") {
        return approval.priority === "HIGH";
      }

      if (filter === "RECENT") {
        const requestedTime = new Date(
          approval.requestedAt
        ).getTime();

        const last24Hours =
          Date.now() - 24 * 60 * 60 * 1000;

        return requestedTime >= last24Hours;
      }

      return true;
    });
  }, [data.approvals, filter]);

  const pendingCount = data.approvals.filter(
    (approval) =>
      approval.status === "WAITING_APPROVAL"
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Pending Approvals
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            You have {pendingCount}{" "}
            {pendingCount === 1 ? "item" : "items"} requiring
            your attention.
          </p>
        </div>

        <ApprovalFilters
          value={filter}
          onValueChange={setFilter}
        />
      </div>

      <ApprovalTable approvals={filteredApprovals} 
        onRowClick={setSelectedApproval}/>
      <ApprovalMetrics metrics={data.metrics} />
      
      <ApprovalDetailsOverlay
        approval={selectedApproval}
        open={selectedApproval !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedApproval(null);
          }
        }}
      />
    </div>
  );
}