"use client";

import {
  CalendarDays,
  Filter,
  RefreshCw,
  Workflow,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ExecutionFilters,
  ExecutionStatus,
} from "@/types/execution";

interface WorkflowOption {
  id: string;
  name: string;
}

interface ExecutionFiltersBarProps {
  filters: ExecutionFilters;
  workflows: WorkflowOption[];
  onFiltersChange: (filters: ExecutionFilters) => void;
  onRefresh: () => void;
}

const statuses: {
  label: string;
  value: ExecutionStatus | "ALL";
}[] = [
  {
    label: "All States",
    value: "ALL",
  },
  {
    label: "Running",
    value: "RUNNING",
  },
  {
    label: "Completed",
    value: "COMPLETED",
  },
  {
    label: "Failed",
    value: "FAILED",
  },
  {
    label: "Waiting Approval",
    value: "WAITING_APPROVAL",
  },
  {
    label: "Retrying",
    value: "RETRYING",
  },
];

export default function ExecutionFiltersBar({
  filters,
  workflows,
  onFiltersChange,
  onRefresh,
}: ExecutionFiltersBarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        {/* Status */}
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-muted-foreground" />

          <Select
            value={filters.status}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                status: value as ExecutionStatus | "ALL",
              })
            }
          >
            <SelectTrigger className="h-10 w-[180px] rounded-lg border bg-muted/30 px-3 text-sm">
              <SelectValue placeholder="All States" />
            </SelectTrigger>

            <SelectContent className="border bg-popover text-popover-foreground">
              {statuses.map((status) => (
                <SelectItem
                  key={status.value}
                  value={status.value}
                >
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date Range */}
        <div className="flex items-center gap-2">
          <CalendarDays className="size-4 text-muted-foreground" />

          <Select
            value={filters.range}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                range: value as ExecutionFilters["range"],
              })
            }
          >
            <SelectTrigger className="h-10 w-[180px] rounded-lg border bg-muted/30 px-3 text-sm">
              <SelectValue placeholder="Last 24 Hours" />
            </SelectTrigger>

            <SelectContent className="border bg-popover text-popover-foreground">
              <SelectItem value="24H">
                Last 24 Hours
              </SelectItem>

              <SelectItem value="7D">
                Last 7 Days
              </SelectItem>

              <SelectItem value="30D">
                Last 30 Days
              </SelectItem>

              <SelectItem value="ALL">
                All Time
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Workflow */}
        <div className="flex items-center gap-2">
          <Workflow className="size-4 text-muted-foreground" />

          <Select
            value={filters.workflowId}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                workflowId: value,
              })
            }
          >
            <SelectTrigger className="h-10 w-[220px] rounded-lg border bg-muted/30 px-3 text-sm">
              <SelectValue placeholder="Any Workflow" />
            </SelectTrigger>

            <SelectContent className="border bg-popover text-popover-foreground">
              <SelectItem value="ALL">
                Any Workflow
              </SelectItem>

              {workflows.map((workflow) => (
                <SelectItem
                  key={workflow.id}
                  value={workflow.id}
                >
                  {workflow.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Refresh */}
      <button
        type="button"
        onClick={onRefresh}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <RefreshCw className="size-4" />
        Refresh
      </button>
    </div>
  );
}