import { ExecutionsData } from "@/types/execution";

const minutesAgo = (minutes: number) =>
  new Date(Date.now() - minutes * 60 * 1000).toISOString();

const hoursAgo = (hours: number) =>
  new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

export const mockExecutionsData: ExecutionsData = {
  executions: [
    {
      id: "8b22f1",

      workflow: {
        id: "workflow-001",
        name: "Data Ingestion Pipeline",
        category: "Production",
        source: "AWS-Lambda",
      },

      status: "RUNNING",

      progress: {
        completedNodes: 5,
        totalNodes: 8,
      },

      startedAt: minutesAgo(2),
      duration: 102,
      currentNode: "TransformPayload",
      retryCount: 0,
    },

    {
      id: "7a11e2",

      workflow: {
        id: "workflow-002",
        name: "Security Audit Sweep",
        category: "Staging",
        source: "GitHub-Action",
      },

      status: "FAILED",

      progress: {
        completedNodes: 3,
        totalNodes: 12,
      },

      startedAt: minutesAgo(15),
      duration: 12,
      currentNode: "AuthValidation",
      retryCount: 0,
    },

    {
      id: "9c33d4",

      workflow: {
        id: "workflow-003",
        name: "Weekly Cache Invalidation",
        category: "System",
        source: "Internal-Service",
      },

      status: "COMPLETED",

      progress: {
        completedNodes: 15,
        totalNodes: 15,
      },

      startedAt: hoursAgo(1),
      duration: 765,
      currentNode: "FinishExecution",
      retryCount: 0,
    },

    {
      id: "1f55a1",

      workflow: {
        id: "workflow-004",
        name: "Production Deployment V2",
        category: "Production",
        source: "Web-App",
      },

      status: "WAITING_APPROVAL",

      progress: {
        completedNodes: 4,
        totalNodes: 20,
      },

      startedAt: hoursAgo(3),
      duration: null,
      currentNode: "AdminApproval",
      retryCount: 0,
    },

    {
      id: "a221f9",

      workflow: {
        id: "workflow-005",
        name: "Email Notification Blast",
        category: "Marketing",
        source: "SendGrid",
      },

      status: "RETRYING",

      progress: {
        completedNodes: 2,
        totalNodes: 5,
      },

      startedAt: hoursAgo(4),
      duration: 135,
      currentNode: "SMTPConnect",
      retryCount: 2,
    },
  ],

  metrics: {
    activeThreads: 128,
    activeThreadsChange: 12,

    successRate: 99.4,

    averageLatency: 412,
    latencyChange: 1.4,

    systemHealth: "OPTIMAL",
  },

  pagination: {
    page: 1,
    pageSize: 15,
    totalItems: 2481,
    totalPages: 166,
  },
};