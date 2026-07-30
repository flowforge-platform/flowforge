"use client";

import { useMemo, useState, useEffect } from "react";

import {
  ExecutionFilters,
  ExecutionsData,
} from "@/types/execution";
import ExecutionFiltersBar from "./ExecutionFiltersBar";
import ExecutionTable from "./ExecutionTable";
import ExecutionPagination from "./ExecutionPagination";
import ExecutionMetrics from "./ExecutionMetrics";


interface ExecutionsViewProps {
  data: ExecutionsData;
}

const initialFilters: ExecutionFilters = {
  status: "ALL",
  range: "24H",
  workflowId: "ALL",
};

const PAGE_SIZE = 5;

export default function ExecutionsView({
  data,
}: ExecutionsViewProps) {

    

    const [currentPage, setCurrentPage] = useState(1)

    function isWithinRange(
      startedAt: string,
      range: ExecutionFilters["range"]
    ) {
      if (range === "ALL") {
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

  const [filters, setFilters] =
    useState<ExecutionFilters>(initialFilters);

  const filteredExecutions = useMemo(() => {
      return data.executions.filter((execution) => {
        const matchesStatus =
          filters.status === "ALL" ||
          execution.status === filters.status;

        const matchesWorkflow =
          filters.workflowId === "ALL" ||
          execution.workflow.id === filters.workflowId;

        const matchesRange = isWithinRange(
          execution.startedAt,
          filters.range
        );

        return (
          matchesStatus &&
          matchesWorkflow &&
          matchesRange
        );
      });
    }, [data.executions, filters]);

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
      return Array.from(
        new Map(
          data.executions.map((execution) => [
            execution.workflow.id,
            execution.workflow,
          ])
        ).values()
      );
    }, [data.executions]);

    useEffect(() => {
      setCurrentPage(1);
    }, [filters]);

  return (
    <div className="space-y-6">
      <ExecutionFiltersBar
        filters={filters}
        workflows={workflows}
        onFiltersChange={setFilters}
        onRefresh={()=>{
          setFilters(initialFilters);
          setCurrentPage(1);
        }}
      />

      <ExecutionTable
        executions={paginatedExecutions}
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

      <ExecutionMetrics metrics={data.metrics} />

    </div>
  );
}