import { CheckCircle2, Clock3 } from "lucide-react";

import { Approval } from "@/types/approval";

interface ApprovalHistoryProps {
  approval: Approval;
}

export default function ApprovalHistory({
  approval,
}: ApprovalHistoryProps) {
  return (
    <section className="border-t px-6 py-6">
      <h3 className="mb-6 text-lg font-semibold">
        Approval History
      </h3>

      <div className="space-y-0">
        {approval.history.map((item, index) => (
          <HistoryItem
            key={item.id}
            item={item}
            isLast={index === approval.history.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

import { ApprovalHistoryItem } from "@/types/approval";

interface HistoryItemProps {
  item: ApprovalHistoryItem;
  isLast: boolean;
}

function HistoryItem({
  item,
  isLast,
}: HistoryItemProps) {
  const isCurrent = item.status === "CURRENT";

  return (
    <div className="flex gap-4">
      {/* Timeline */}
      <div className="flex w-6 flex-col items-center">
        <div
          className={`flex size-6 items-center justify-center rounded-full ${
            isCurrent
              ? "bg-primary text-primary-foreground"
              : "bg-green-500 text-white"
          }`}
        >
          {isCurrent ? (
            <Clock3 className="size-3.5" />
          ) : (
            <CheckCircle2 className="size-3.5" />
          )}
        </div>

        {!isLast && (
          <div className="mt-1 h-full w-px bg-border" />
        )}
      </div>

      {/* Content */}
      <div className="pb-8">
        <h4 className="font-medium">
          {item.title}
        </h4>

        <p className="mt-1 text-sm text-muted-foreground">
          {item.description}
        </p>

        <p className="mt-2 text-xs text-muted-foreground">
          {item.timestamp}
        </p>
      </div>
    </div>
  );
}