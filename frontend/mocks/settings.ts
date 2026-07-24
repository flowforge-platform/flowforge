import { Settings } from "@/types/settings";

export const settings: Settings = {
  general: {
    theme: "dark",
    timezone: "UTC (Coordinated Universal Time)",
    dateFormat: "YYYY-MM-DD",
  },

  notifications: [
    {
      id: "workflow-failed",
      title: "Workflow Failed",
      description:
        "Receive alerts when an active flow encounters a runtime exception.",
      enabled: true,
    },
    {
      id: "approval-requested",
      title: "Approval Requested",
      description:
        "Notifications for nodes requiring manual intervention.",
      enabled: true,
    },
    {
      id: "execution-completed",
      title: "Execution Completed",
      description:
        "Summary report after each successful workflow run.",
      enabled: false,
    },
    {
      id: "retry-exhausted",
      title: "Retry Exhausted",
      description:
        "Alerts when automatic retry cycles fail to resolve issues.",
      enabled: true,
    },
    {
      id: "webhook-triggered",
      title: "Webhook Triggered",
      description:
        "Confirmation when an external inbound event is received.",
      enabled: false,
    },
  ],

  execution: {
    autoReconnect: true,
    refreshInterval: "5s",
    logRetention: "30 Days",
  },

  security: {
    twoFactorEnabled: false,
    sessionManagementEnabled: true,
  },

  api: {
    apiKey: "••••••••••••••••••••••••••••••••",
    webhookSecret: "whsec_ff_82937X...",
  },

  usage: {
    percentage: 75,
    description: "75% of execution units used",
  },
};