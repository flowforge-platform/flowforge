"use client";

import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";

import { Approval } from "@/types/approval";
import ApprovalDetailsHeader from "./ApprovalDetailsHeader";
import ApprovalSummary from "./ApprovalSummary";
import RequestContext from "./RequestContext";
import ApprovalHistory from "./ApprovalHistory";
import ApprovalActions from "./ApprovalActions";

interface ApprovalDetailsOverlayProps {
  approval: Approval | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ApprovalDetailsOverlay({
  approval,
  open,
  onOpenChange,
}: ApprovalDetailsOverlayProps) {
  if (!approval) return null;

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent
        side="right"
        className="flex w-[560px] flex-col p-0 sm:max-w-[560px]"
      >
        <div className="flex-1 overflow-y-auto">
          <ApprovalDetailsHeader
            approval={approval}
          />
        
          <ApprovalSummary approval={approval} />

          <RequestContext approval={approval} />

          <ApprovalHistory approval={approval} />

          <div className="px-6 pb-6">
            Remaining content...
          </div>
        </div>

        <ApprovalActions approval={approval} />

      </SheetContent>
    </Sheet>
  );
}