export type BackendExecutionStatus =
  | "PENDING"
  | "RUNNING"
  | "COMPLETED"
  | "FAILED";

export type ExecutionStatus = BackendExecutionStatus | string;

export interface StartExecutionResponse {
  workflowId: string;
  status: BackendExecutionStatus | string;
}

export interface GetExecutionResponse {
  executionId: string;
  workflowId: string;
  status: BackendExecutionStatus | string;
  startedAt: string;
  completedAt: string | null;
}

export interface TaskExecutionResponse {
  id?: string;
  taskExecutionId?: string;
  nodeId: string;
  nodeType: string;
  status: string;
  startedAt: string;
  completedAt: string | null;
  errorMessage: string | null;
}

export interface Execution {
  id: string;
  workflow: {
    id: string;
    name: string;
    category?: string;
    source?: string;
  };
  status: ExecutionStatus;
  startedAt: string;
  completedAt?: string | null;
  duration: number | null;
  progress?: {
    completedNodes: number;
    totalNodes: number;
  } | null;
  currentNode?: string | null;
  retryCount?: number;
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
  metrics?: ExecutionMetrics;
  pagination?: {
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