import { TemplatesData } from "@/types/template";

const daysAgo = (days: number) =>
  new Date(
    Date.now() - days * 24 * 60 * 60 * 1000
  ).toISOString();

export const mockTemplatesData: TemplatesData = {
  templates: [
    {
      id: "template-001",
      name: "Customer Onboarding",
      description:
        "Standard pipeline for welcoming new SaaS customers, including CRM sync and account setup.",

      category: "ONBOARDING",
      difficulty: "MODERATE",

      nodeCount: 12,
      likes: 4200,

      version: "v2.4",

      scope: "SHARED",

      createdAt: daysAgo(30),

      isPopular: true,
    },

    {
      id: "template-002",
      name: "Loan Approval Flow",
      description:
        "Complex conditional branching for financial services, credit checks, and approval workflows.",

      category: "APPROVALS",
      difficulty: "ADVANCED",

      nodeCount: 24,
      likes: 1800,

      scope: "SHARED",

      createdAt: daysAgo(20),

      isPopular: true,
    },

    {
      id: "template-003",
      name: "Incident Escalation",
      description:
        "High-priority alert routing, automated escalation, and on-call response coordination.",

      category: "INCIDENT_RESPONSE",
      difficulty: "SIMPLE",

      nodeCount: 8,
      likes: 6100,

      scope: "SHARED",

      createdAt: daysAgo(15),

      isPopular: true,
    },

    {
      id: "template-004",
      name: "JSON API Validator",
      description:
        "Automated schema checking and error reporting for REST endpoints.",

      category: "REPORTING",
      difficulty: "SIMPLE",

      nodeCount: 15,
      likes: 340,

      scope: "MY_TEMPLATES",

      createdAt: daysAgo(1),

      isPopular: false,
    },

    {
      id: "template-005",
      name: "Email Drip Campaign",
      description:
        "Event-driven messaging sequence with open-rate monitoring logic.",

      category: "ONBOARDING",
      difficulty: "MODERATE",

      nodeCount: 6,
      likes: 720,

      scope: "SHARED",

      createdAt: daysAgo(2),

      isPopular: false,
    },
  ],
};