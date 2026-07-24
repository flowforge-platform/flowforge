import { Building2, Wallet } from "lucide-react";

import { Approval } from "@/types/approval";

interface ApprovalSummaryProps {
  approval: Approval;
}

import { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

function SummaryCard({
  icon: Icon,
  label,
  value,
}: SummaryCardProps) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="mb-3 flex items-center gap-2 text-muted-foreground">
        <Icon className="size-4" />
        <span className="text-xs uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p className="text-xl font-semibold">
        {value}
      </p>
    </div>
  );
}

export default function ApprovalSummary({
  approval,
}: ApprovalSummaryProps) {
  return (
    <section className="grid grid-cols-2 gap-4 px-6 py-5">
      <SummaryCard
        icon={Wallet}
        label="Budget"
        value={`₹${approval.budget.toLocaleString()}`}
      />

      <SummaryCard
        icon={Building2}
        label="Department"
        value={approval.department}
      />
    </section>
  );
}