import { DashboardData } from "@/types/dashboard";

const minutesAgo = (minutes: number) =>
  new Date(Date.now() - minutes * 60 * 1000).toISOString();

export const mockDashboardData: DashboardData = {
  stats: {
    totalWorkflows: 128,
    workflowGrowth: 5,

    runningExecutions: 14,

    completedExecutions: 2400,
    successRate: 99.2,

    failedExecutions24h: 12,
    failureChange: -2,

    pendingApprovals: 3,
  },

  runningExecutions: [
    {
      id: "exec-001",
      workflowName: "Order Processing",
      currentStep: "Database Sync",
      progress: 65,
      status: "RUNNING",
      startedAt: "2026-07-13T08:30:00Z",
    },
    {
      id: "exec-002",
      workflowName: "Data Sync Engine",
      currentStep: "Approval Flow",
      progress: 75,
      status: "WAITING",
      startedAt: "2026-07-13T08:10:00Z",
    },
  ],

  activities: [
    {
      id: "activity-001",
      type: "APPROVAL_REQUESTED",
      message:
        "Approval Requested: 'Update User Tier' workflow requires manual review.",
      createdAt: minutesAgo(2),
    },
    {
      id: "activity-002",
      type: "EXECUTION_COMPLETED",
      message:
        "Execution Completed: 'Github Webhook' finished successfully in 4.2s.",
      createdAt: minutesAgo(12),
    },
    {
      id: "activity-003",
      type: "EXECUTION_STARTED",
      message:
        "Execution Started: 'Nightly Backup' triggered by Cron Scheduler.",
      createdAt: minutesAgo(45),
    },
  ],

  systemHealth: {
    successRate: 99.2,
    failureRate: 0.8,
    retryCount: 45,
    activeInstances: 14,
    averageExecutionTime: 1.2,
    resourceUsage: "OPTIMAL",
  },
};

