import {
  Activity,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Workflow,
} from "lucide-react";

import { getDashboardData } from "@/lib/api/dashboard";
import StatCard from "@/components/dashboard/StatCard";
import RunningExecutions from "../../../components/dashboard/RunningExecutions";
import QuickActions from "../../../components/dashboard/QuickActions";
import LiveActivity from "../../../components/dashboard/LiveActivity";
import SystemHealth from "../../../components/dashboard/SystemHealth";
import { getGreeting } from "@/lib/utils/get-greeting";
import { formatNumber } from "@/lib/utils/format-number";

export default async function Dashboard() {
  const dashboard = await getDashboardData();
  const greeting = getGreeting()

  const { stats } = dashboard;

  const statCards = [
    {
      title: "Total Workflows",
      value: stats.totalWorkflows,
      trend: stats.workflowGrowth,
      description: "from last week",
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
      title: "Pending Approvals",
      value: stats.pendingApprovals,
      description: "Requires attention",
      icon: Clock3,
    },
  ];

  return (
    <main className="min-h-screen bg-background p-6 lg:p-8">
    <div className="mx-auto max-w-[1500px] space-y-6">

      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {greeting}, Sahil 👋
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
      <div className="space-y-6">
        <RunningExecutions
          executions={dashboard.runningExecutions}
        />

        <LiveActivity
          activities={dashboard.activities}
        />
      </div>
        
      <div className="space-y-6">
        <QuickActions />

        <SystemHealth
          health={dashboard.systemHealth}
        />
      </div>
    </div>

    </div>
    </main>
  );
}