"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  CircleAlert,
  Clock3,
  RefreshCw,
  Workflow,
} from "lucide-react";

import { getDashboardData } from "@/lib/api/dashboard";
import type { DashboardData } from "@/types/dashboard";
import StatCard from "@/components/dashboard/StatCard";
import RunningExecutions from "@/components/dashboard/RunningExecutions";
import QuickActions from "@/components/dashboard/QuickActions";
import LiveActivity from "@/components/dashboard/LiveActivity";
import SystemHealth from "@/components/dashboard/SystemHealth";
import { getGreeting } from "@/lib/utils/get-greeting";
import { formatNumber } from "@/lib/utils/format-number";
import { Button } from "@/components/ui/button";

export default function DashboardView() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getDashboardData();
      setDashboard(data);
    } catch (err: any) {
      console.error("Failed to load dashboard data:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load dashboard data. Please check your connection or login status."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background p-6 lg:p-8">
        <div className="mx-auto flex min-h-[400px] max-w-[1500px] flex-col items-center justify-center space-y-3 rounded-xl border bg-card p-8 text-center">
          <RefreshCw className="size-7 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading dashboard data...</p>
        </div>
      </main>
    );
  }

  if (error || !dashboard) {
    return (
      <main className="min-h-screen bg-background p-6 lg:p-8">
        <div className="mx-auto flex min-h-[400px] max-w-[1500px] flex-col items-center justify-center space-y-3 rounded-xl border bg-card p-8 text-center">
          <AlertCircle className="size-8 text-destructive" />
          <div className="space-y-1">
            <p className="font-semibold text-foreground">Failed to Load Dashboard</p>
            <p className="max-w-md text-sm text-muted-foreground">
              {error || "An unexpected error occurred while loading dashboard metrics."}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchDashboard}
            className="mt-2 gap-2"
          >
            <RefreshCw className="size-4" />
            Retry
          </Button>
        </div>
      </main>
    );
  }

  const greeting = getGreeting();
  const { stats } = dashboard;

  const statCards = [
    {
      title: "Total Workflows",
      value: stats.totalWorkflows,
      description: `${stats.createdThisWeek} created this week`,
      icon: Workflow,
    },
    {
      title: "Running Executions",
      value: stats.runningExecutions,
      description: "Currently active",
      icon: Activity,
    },
    {
      title: "Completed",
      value: formatNumber(stats.completedExecutions),
      description: `${stats.successRate}% success rate`,
      icon: CheckCircle2,
    },
    {
      title: "Failed (24h)",
      value: stats.failedExecutions24h,
      trend: stats.failureChange,
      description: "from yesterday",
      icon: CircleAlert,
    },
    {
      title: "Total Executions",
      value: formatNumber(stats.totalExecutions),
      description: "All time executions",
      icon: Clock3,
    },
  ];

  return (
    <main className="min-h-screen bg-background p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {greeting} 👋
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Here&apos;s what&apos;s happening with your workflows.
            </p>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {statCards.map((card) => (
            <StatCard
              key={card.title}
              title={card.title}
              value={card.value}
              description={card.description}
              trend={card.trend}
              icon={card.icon}
            />
          ))}
        </section>

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,0.95fr)]">
          <div className="space-y-6 min-w-0">
            <RunningExecutions executions={dashboard.runningExecutions} />
            <LiveActivity activities={dashboard.activities} />
          </div>

          <div className="space-y-6 min-w-0">
            <QuickActions />
            <SystemHealth health={dashboard.systemHealth} />
          </div>
        </div>
      </div>
    </main>
  );
}