import { ApprovalsData } from "@/types/approval";

const hoursAgo = (hours: number) =>
  new Date(
    Date.now() - hours * 60 * 60 * 1000
  ).toISOString();

const daysAgo = (days: number) =>
  new Date(
    Date.now() - days * 24 * 60 * 60 * 1000
  ).toISOString();

export const mockApprovalsData: ApprovalsData = {
  approvals: [
    {
      id: "workflow-001",

      workflow: {
        id: "wf-001",
        name: "Purchase Approval",
      },
    
      requestedBy: {
        id: "user-1",
        name: "Sarah Connor",
      },
    
      currentStep: "Manager Review",
      requestedAt: "2026-07-13T08:10:00Z",
    
      priority: "HIGH",
      status: "WAITING_APPROVAL",
    
      budget: 50000,
    
      department: "Marketing",
    
      context: {
        costCenter: "MKT-24-ASIA",
        vendor: "Adobe Creative Cloud",
        description:
          "Annual subscription renewal for the global design team (15 licenses).",
      },
    
      history: [
        {
          id: "1",
          title: "Requested by Sarah Connor",
          description: "Submitted via Mobile Portal",
          timestamp: "10:45 AM",
          status: "COMPLETED",
        },
        {
          id: "2",
          title: "Automated Validation Pass",
          description: "Budget check verified against MKT-24",
          timestamp: "10:46 AM",
          status: "COMPLETED",
        },
        {
          id: "3",
          title: "Awaiting Your Approval",
          description: "Final stakeholder sign-off",
          timestamp: "Now",
          status: "CURRENT",
        },
      ],
    }
  ],

  metrics: {
    approvalRate: 94.2,
    averageResolutionTime: 4.2,
    delegatedTasks: 8,
  },
};