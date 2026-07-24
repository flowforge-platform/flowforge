import ApprovalsView from "@/components/approvals/ApprovalsView";
import { getApprovalsData } from "@/lib/api/approvals";

export default async function ApprovalsPage() {
  const data = await getApprovalsData();

  return (
    <main className="min-h-screen p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px]">
        <ApprovalsView data={data} />
      </div>
    </main>
  );
}