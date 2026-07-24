"use client";

import { Button } from "@/components/ui/button";
import { Approval } from "@/types/approval";

interface ApprovalActionsProps {
  approval: Approval;
}



export default function ApprovalActions({
  approval,
}: ApprovalActionsProps) {

    const isPending = approval.status === "WAITING_APPROVAL"
  return (
    <footer className="sticky bottom-0 border-t bg-background px-6 py-4">
      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          disabled={!isPending}
          onClick={() =>
            console.log("Reject", approval.id)
          }
        >
          Reject
        </Button>

        <Button
          disabled={!isPending}
          onClick={() =>
            console.log("Approve", approval.id)
          }
        >
          Approve Request
        </Button>
      </div>
    </footer>
  );
}