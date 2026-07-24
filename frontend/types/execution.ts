export type ExecutionStatus =
  | "RUNNING"
  | "FAILED"
  | "COMPLETED"
  | "WAITING_APPROVAL"
  | "RETRYING";

export interface Execution {
  id: string;

  workflow: {
    id: string;
    name: string;
    category: string;
    source: string;
  };

  status: ExecutionStatus;

  progress: {
    completedNodes: number;
    totalNodes: number;
  };

  startedAt: string;

  duration: number | null;

  currentNode: string | null;

  retryCount: number;
}

export interface ExecutionMetrics {
  activeThreads: number;
  activeThreadsChange: number;

  successRate: number;

  averageLatency: number;
  latencyChange: number;

  systemHealth: "OPTIMAL" | "DEGRADED" | "CRITICAL";
}

export interface ExecutionsData {
  executions: Execution[];
  metrics: ExecutionMetrics;

  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface ExecutionFilters {
  status: ExecutionStatus | "ALL";
  range: "24H" | "7D" | "30D" | "ALL";
  workflowId: string | "ALL";
}