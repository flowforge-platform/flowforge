import { mockApprovalsData } from "@/mocks/approvals";
import { ApprovalsData } from "@/types/approval";

export async function getApprovalsData(): Promise<ApprovalsData> {
  return mockApprovalsData;
}