export interface DashboardStats {
  totalWorkflows: number;
  workflowGrowth: number;

  runningExecutions: number;

  completedExecutions: number;
  successRate: number;

  failedExecutions24h: number;
  failureChange: number;

  pendingApprovals: number;
}

export type ExecutionStatus = "RUNNING" | "WAITING";

export interface RunningExecution {
  id: string;
  workflowName: string;
  currentStep: string;
  progress: number;
  status: ExecutionStatus;
  startedAt: string;
}

export type ActivityType =
  | "APPROVAL_REQUESTED"
  | "EXECUTION_COMPLETED"
  | "EXECUTION_STARTED"
  | "EXECUTION_FAILED";

export interface Activity {
  id: string;
  type: ActivityType;
  message: string;
  createdAt: string;
}

export interface SystemHealth {
  successRate: number;
  failureRate: number;
  retryCount: number;
  activeInstances: number;
  averageExecutionTime: number;
  resourceUsage: "OPTIMAL" | "MODERATE" | "HIGH";
}

export interface DashboardData {
  stats: DashboardStats;
  runningExecutions: RunningExecution[];
  activities: Activity[];
  systemHealth: SystemHealth;
}