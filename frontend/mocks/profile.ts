import { Profile } from "@/types/profile";

export const profile: Profile = {
  user: {
    name: "Linus Torvalds",
    email: "linus@flowforge.io",
    avatar: "https://i.pravatar.cc/300?img=12",

    role: "Platform Architect",
    organization: "Engineering Org",
    memberSince: "Jan 2024",

    badges: [
      {
        label: "Verified Admin",
        variant: "default",
      },
      {
        label: "Pro Tier",
        variant: "secondary",
      },
    ],
  },

  security: {
    lastLogin: "2 hours ago",
    location: "San Francisco, CA",
  },

  stats: [
    {
      id: "workflows",
      label: "Workflows Created",
      value: "42",
      icon: "workflow",
    },
    {
      id: "executions",
      label: "Executions Triggered",
      value: "1.2k",
      icon: "execution",
    },
    {
      id: "approvals",
      label: "Pending Approvals",
      value: "3",
      icon: "approval",
    },
    {
      id: "templates",
      label: "Templates Used",
      value: "12",
      icon: "template",
    },
  ],

  activities: [
    {
      id: "1",
      title: "Created 'Data Pipeline v2' workflow",
      description: "Project: Infrastructure Ops",
      timestamp: "2 hours ago",
      type: "workflow",
    },
    {
      id: "2",
      title: "Executed 'Onboarding' flow",
      description: "Target: HR Cluster 1",
      timestamp: "5 hours ago",
      type: "execution",
    },
    {
      id: "3",
      title: "Approved 'Purchase Request #772'",
      description: "Requester: dev-team-lead",
      timestamp: "Yesterday at 4:30 PM",
      type: "approval",
    },
    {
      id: "4",
      title: "Updated profile settings",
      description: "Changed display avatar",
      timestamp: "Oct 12, 2024",
      type: "profile",
    },
  ],
};