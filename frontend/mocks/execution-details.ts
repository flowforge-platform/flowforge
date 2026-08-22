import { ExecutionDetails } from "@/types/execution-details";

export const executionDetails: ExecutionDetails[] = [
  {
    id: "exec_883a_9921_f2",

    workflowId: "mock_wf_1",

    workflowName: "Onboarding Sync",

    duration: "04:22:15",

    progress: 67,

    status: "WAITING",

    stats: {
      success: 14,
      active: 1,
      error: 1,
    },

    infrastructure: {
      worker: "us-east-1a",
      memory: "1.2 GB",
    },

    nodes: [
      {
        id: "start",
        status: "SUCCESS",
      },
      {
        id: "fetch-profile",
        status: "SUCCESS",
      },
      {
        id: "plan-check",
        status: "WAITING",
      },
      {
        id: "notify",
        status: "IDLE",
      },
      {
        id: "complete",
        status: "IDLE",
      },
    ],

    timeline: [
      {
        id: "1",
        title: "Started",
        description: "Workflow execution started",
        timestamp: "14:22:15",
        status: "SUCCESS",
      },
      {
        id: "2",
        title: "Profile Fetched",
        description: "User profile retrieved",
        timestamp: "14:22:16",
        status: "SUCCESS",
      },
      {
        id: "3",
        title: "Awaiting Human",
        description: "Waiting for CSM approval",
        timestamp: "14:23:02",
        status: "WAITING",
      },
    ],

    logs: [
      {
        id: "1",
        timestamp: "14:23:02.12",
        level: "WAIT",
        message:
          "Node 'CSM Review' reached. Execution suspended.",
      },
      {
        id: "2",
        timestamp: "14:23:02.15",
        level: "INFO",
        message:
          "Dispatched approval request email to csm-leads@acme.com",
      },
      {
        id: "3",
        timestamp: "14:23:02.18",
        level: "INFO",
        message:
          "Persisting workflow state to database...",
      },
      {
        id: "4",
        timestamp: "14:23:03.00",
        level: "SYSTEM",
        message:
          "Waiting for human intervention...",
      },
    ],
  },
];