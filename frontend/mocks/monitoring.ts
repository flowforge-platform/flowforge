import { MonitoringData } from "@/types/monitoring";

const minutesAgo = (minutes: number) =>
  new Date(
    Date.now() - minutes * 60 * 1000
  ).toISOString();

export const mockMonitoringData: MonitoringData = {
  metrics: {
    activeWorkflows: 128,
    throughput: 1200,
    successRate: 99.4,
    failureRate: 0.6,
    retryCount: 14,
    averageExecutionTime: 1.4,
  },

  throughput: [
    {
      label: "00",
      started: 80,
      completed: 74,
      failed: 6,
    },
    {
      label: "04",
      started: 102,
      completed: 97,
      failed: 5,
    },
    {
      label: "08",
      started: 132,
      completed: 125,
      failed: 7,
    },
    {
      label: "12",
      started: 150,
      completed: 145,
      failed: 5,
    },
    {
      label: "16",
      started: 118,
      completed: 112,
      failed: 6,
    },
    {
      label: "20",
      started: 135,
      completed: 129,
      failed: 6,
    },
  ],

  activeExecutions: [
    {
      id: "ff-9283-x",
      workflowName: "Customer Onboarding",
      status: "RUNNING",
    },
    {
      id: "ff-7712-k",
      workflowName: "Incident Escalation",
      status: "WAITING_APPROVAL",
    },
    {
      id: "ff-0102-m",
      workflowName: "Payment Sync",
      status: "RETRYING",
    },
  ],

  infrastructure: {
    services: [
      {
        id: "worker",
        name: "Worker Service",
        status: "HEALTHY",
      },
      {
        id: "kafka",
        name: "Kafka",
        status: "HEALTHY",
      },
      {
        id: "redis",
        name: "Redis",
        status: "HEALTHY",
      },
      {
        id: "postgres",
        name: "PostgreSQL",
        status: "HEALTHY",
      },
      {
        id: "sse",
        name: "SSE Stream",
        status: "HEALTHY",
      },
    ],

    metrics: {
      cpuUsage: 34,
      memoryUsage: 6.1,
      eventRate: 18000,
    },
  },

  failedWorkflows: [
    {
      id: "1",
      workflowName:
        "Stripe Webhook Listener",
      reason: "Timeout (5s)",
    },
    {
      id: "2",
      workflowName:
        "Data Migration Sync",
      reason: "Auth Failure",
    },
    {
      id: "3",
      workflowName:
        "Slack Notification Bot",
      reason: "Invalid Payload",
    },
  ],

  retryBackoff: [
    { attempt: 1, count: 2 },
    { attempt: 2, count: 5 },
    { attempt: 3, count: 3 },
    { attempt: 4, count: 8 },
    { attempt: 5, count: 6 },
    { attempt: 6, count: 11 },
    { attempt: 7, count: 7 },
    { attempt: 8, count: 4 },
    { attempt: 9, count: 1 },
  ],

  recentEvents: [
    {
      id: "1",
      type: "ERROR",
      title:
        "Workflow Failed: Stripe Webhook Listener",
      description:
        "Execution ff-9921 terminated with exit code 1.",
      timestamp: minutesAgo(5),
    },

    {
      id: "2",
      type: "INFO",
      title:
        "Kafka Consumer Reconnected",
      description:
        "Partition 4 assigned to worker node-03.",
      timestamp: minutesAgo(8),
    },

    {
      id: "3",
      type: "WARNING",
      title:
        "Worker Timeout Detected",
      description:
        "Worker node-12 failed heartbeat check.",
      timestamp: minutesAgo(11),
    },
  ],
};