"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ExecutionFilters, Execution } from "@/types/execution";
import { getExecutionsData } from "@/lib/api/executions";
import ExecutionFiltersBar from "./ExecutionFiltersBar";
import ExecutionTable from "./ExecutionTable";
import ExecutionPagination from "./ExecutionPagination";

interface ExecutionsViewProps {
  initialData?: Execution[];
}

const initialFilters: ExecutionFilters = {
  status: "ALL",
  range: "ALL",
  workflowId: "ALL",
};

const PAGE_SIZE = 10;

export default function ExecutionsView({ initialData }: ExecutionsViewProps) {
  const [executions, setExecutions] = useState<Execution[] | null>(
    initialData || null
  );
  const [isLoading, setIsLoading] = useState<boolean>(!initialData);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<ExecutionFilters>(initialFilters);

  const fetchExecutions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getExecutionsData();
      setExecutions(result);
    } catch (err: any) {
      console.error("Failed to load executions:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load execution history. Please check your connection or login status."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters(initialFilters);
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    if (!initialData) {
      fetchExecutions();
    }
  }, [fetchExecutions, initialData]);

  function isWithinRange(
    startedAt: string,
    range: ExecutionFilters["range"]
  ) {
    if (range === "ALL" || !startedAt) {
      return true;
    }

    const startedTime = new Date(startedAt).getTime();
    const now = Date.now();

    const rangeInMilliseconds = {
      "24H": 24 * 60 * 60 * 1000,
      "7D": 7 * 24 * 60 * 60 * 1000,
      "30D": 30 * 24 * 60 * 60 * 1000,
    }[range];

    return now - startedTime <= rangeInMilliseconds;
  }

  const filteredExecutions = useMemo(() => {
    if (!executions) return [];
    return executions.filter((execution) => {
      const matchesStatus =
        filters.status === "ALL" ||
        execution.status.toUpperCase() === filters.status.toUpperCase();

      const matchesWorkflow =
        filters.workflowId === "ALL" ||
        execution.workflow.id === filters.workflowId;

      const matchesRange = isWithinRange(execution.startedAt, filters.range);

      return matchesStatus && matchesWorkflow && matchesRange;
    });
  }, [executions, filters]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredExecutions.length / PAGE_SIZE)
  );

  const paginatedExecutions = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    return filteredExecutions.slice(startIndex, endIndex);
  }, [filteredExecutions, currentPage]);

  const workflows = useMemo(() => {
    if (!executions) return [];
    return Array.from(
      new Map(
        executions.map((execution) => [
          execution.workflow.id,
          execution.workflow,
        ])
      ).values()
    );
  }, [executions]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  if (isLoading) {
    return (
      <div className="flex min-h-[350px] flex-col items-center justify-center space-y-3 rounded-xl border bg-card p-8 text-center">
        <RefreshCw className="size-7 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Loading execution history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[350px] flex-col items-center justify-center space-y-3 rounded-xl border bg-card p-8 text-center">
        <AlertCircle className="size-8 text-destructive" />
        <div className="space-y-1">
          <p className="font-semibold text-foreground">Failed to Load Executions</p>
          <p className="max-w-md text-sm text-muted-foreground">{error}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchExecutions}
          className="mt-2 gap-2"
        >
          <RefreshCw className="size-4" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ExecutionFiltersBar
        filters={filters}
        workflows={workflows}
        onFiltersChange={setFilters}
        onRefresh={fetchExecutions}
      />

      <ExecutionTable
        executions={paginatedExecutions}
        totalExecutionsCount={executions?.length || 0}
        onClearFilters={handleClearFilters}
        pagination={
          <ExecutionPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredExecutions.length}
            pageSize={PAGE_SIZE}
            onPageChange={setCurrentPage}
          />
        }
      />
    </div>
  );
}