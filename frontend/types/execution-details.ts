export type ExecutionNodeStatus =
  | "IDLE"
  | "RUNNING"
  | "SUCCESS"
  | "FAILED"
  | "WAITING";

export interface ExecutionNode {
  id: string;
  status: ExecutionNodeStatus;
}

export interface ExecutionStat {
  success: number;
  active: number;
  error: number;
}

export interface InfrastructureInfo {
  worker: string;
  memory: string;
}

export interface ExecutionTimelineItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: "SUCCESS" | "WAITING" | "FAILED";
}

export interface ExecutionLog {
  id: string;
  timestamp: string;
  level: "INFO" | "WAIT" | "SYSTEM" | "ERROR";
  message: string;
}

export interface ExecutionDetails {
  id: string;

  workflowName: string;

  duration: string;

  progress: number;

  status:
    | "RUNNING"
    | "WAITING"
    | "FAILED"
    | "COMPLETED";

  stats: ExecutionStat;

  infrastructure: InfrastructureInfo;

  nodes: ExecutionNode[];

  timeline: ExecutionTimelineItem[];

  logs: ExecutionLog[];
}