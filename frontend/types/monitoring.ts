export type MonitoringRange =
  | "24H"
  | "7D";

export type ServiceStatus =
  | "HEALTHY"
  | "WARNING"
  | "OFFLINE";

export type ExecutionStatus =
  | "RUNNING"
  | "WAITING_APPROVAL"
  | "RETRYING";

export interface MonitoringMetrics {
  activeWorkflows: number;
  throughput: number;
  successRate: number;
  failureRate: number;
  retryCount: number;
  averageExecutionTime: number;
}

export interface ThroughputPoint {
  label: string;

  started: number;
  completed: number;
  failed: number;
}

export interface ActiveExecution {
  id: string;
  workflowName: string;
  status: ExecutionStatus;
}

export interface InfrastructureService {
  id: string;
  name: string;
  status: ServiceStatus;
}

export interface InfrastructureMetrics {
  cpuUsage: number;
  memoryUsage: number;
  eventRate: number;
}

export interface FailedWorkflow {
  id: string;
  workflowName: string;
  reason: string;
}

export interface RetryBackoffPoint {
  attempt: number;
  count: number;
}

export interface PlatformEvent {
  id: string;
  type:
    | "ERROR"
    | "INFO"
    | "WARNING";

  title: string;

  description: string;

  timestamp: string;
}

export interface MonitoringData {
  metrics: MonitoringMetrics;

  throughput: ThroughputPoint[];

  activeExecutions: ActiveExecution[];

  infrastructure: {
    services: InfrastructureService[];
    metrics: InfrastructureMetrics;
  };

  failedWorkflows: FailedWorkflow[];

  retryBackoff: RetryBackoffPoint[];

  recentEvents: PlatformEvent[];
}