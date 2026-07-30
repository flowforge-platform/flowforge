interface ApprovalDetailsHeaderProps {
  approval: Approval;
}

import { Approval } from "@/types/approval";

const priorityConfig = {
  HIGH: {
    label: "High Priority",
    className:
      "border-red-500/20 bg-red-500/10 text-red-400",
  },

  MEDIUM: {
    label: "Medium Priority",
    className:
      "border-violet-500/20 bg-violet-500/10 text-violet-400",
  },

  LOW: {
    label: "Low Priority",
    className:
      "border-muted bg-muted/50 text-muted-foreground",
  },
};

interface ApprovalDetailsHeaderProps {
  approval: Approval;
}

export default function ApprovalDetailsHeader({
  approval,
}: ApprovalDetailsHeaderProps) {
  const priority =
    priorityConfig[approval.priority];

  return (
    <header className="border-b px-6 py-5">
      <h2 className="text-2xl font-semibold">
        {approval.workflow.name}
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Workflow ID: {approval.workflow.id}
      </p>

      <span
        className={`mt-5 inline-flex rounded-md border px-3 py-1 text-xs font-medium uppercase tracking-wider ${priority.className}`}
      >
        {priority.label}
      </span>
    </header>
  );
}