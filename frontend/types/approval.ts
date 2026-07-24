export type ApprovalPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH";

export type ApprovalStatus =
  | "WAITING_APPROVAL"
  | "APPROVED"
  | "REJECTED";

export interface ApprovalHistoryItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: "COMPLETED" | "CURRENT";
}

export interface ApprovalContext {
  costCenter: string;
  vendor: string;
  description: string;
}

export interface Approval {
  id: string;

  workflow: {
    id: string;
    name: string;
  };

  requestedBy: {
    id: string;
    name: string;
    avatar?: string;
  };

  currentStep: string;

  requestedAt: string;

  priority: ApprovalPriority;

  status: ApprovalStatus;

  // Details panel
  budget: number;
  department: string;

  context: ApprovalContext;

  history: ApprovalHistoryItem[];
}

export interface ApprovalMetrics {
  approvalRate: number;
  averageResolutionTime: number;
  delegatedTasks: number;
}

export interface ApprovalsData {
  approvals: Approval[];
  metrics: ApprovalMetrics;
}

export type ApprovalFilter =
  | "ALL"
  | "URGENT"
  | "RECENT";