"use client";

import { useMemo, useState } from "react";

import {
  MonitoringData,
  MonitoringRange,
} from "@/types/monitoring";

import MonitoringFilters from "./MonitoringFilters";
import MonitoringMetrics from "./MonitoringMetrics";
import ThroughputChart from "./ThroughputChart";
import ActiveExecutions from "./ActiveExecutions";
import RetryBackoffChart from "./RetryBackoffChart";
import InfrastructureHealth from "./InfrastructureHealth";
import FailedWorkflows from "./FailedWorkflows";
import RecentPlatformEvents from "./RecentPlatformEvents";

interface MonitoringViewProps {
  data: MonitoringData;
}

export default function MonitoringView({
  data,
}: MonitoringViewProps) {
  const [range, setRange] =
    useState<MonitoringRange>("24H");

  const filteredData = useMemo(() => {
    /**
     * Later:
     * range change -> refetch API
     *
     * For mock phase
     * simply return current data.
     */
    return data;
  }, [data, range]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Monitoring
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Observe workflow execution health and
            infrastructure performance.
          </p>
        </div>

        <MonitoringFilters
          range={range}
          onRangeChange={setRange}
        />
      </div>

      {/* KPI Cards */}
      <MonitoringMetrics
        metrics={filteredData.metrics}
      />

      {/* Main Content */}
      <div className="grid gap-6 xl:grid-cols-3">

        {/* Left */}
        <div className="xl:col-span-2">
          <ThroughputChart
            data={filteredData.throughput}
          />
        </div>

        {/* Right */}
        <ActiveExecutions
          executions={filteredData.activeExecutions}
        />

        {/* Left */}
        <InfrastructureHealth
            infrastructure={filteredData.infrastructure}
        />

        {/* Right Top */}
        <FailedWorkflows
            workflows={filteredData.failedWorkflows}
        />

        {/* Right Bottom */}
        <RetryBackoffChart
          data={filteredData.retryBackoff}
        />

        {/* Bottom */}
        <div className="xl:col-span-3">
          <RecentPlatformEvents
            events={filteredData.recentEvents}
          />
        </div>

      </div>
    </div>
  );
}