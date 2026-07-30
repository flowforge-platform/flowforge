import { notFound } from "next/navigation";

import { getExecutionDetails } from "@/lib/api/execution-details";

import ExecutionDetailsView from "@/components/execution-details/ExecutionDetailsView";

interface ExecutionDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ExecutionDetailsPage({
  params,
}: ExecutionDetailsPageProps) {
  const { id } = await params;

  const execution =
    await getExecutionDetails(id);

  if (!execution) {
    notFound();
  }

  return (
    <ExecutionDetailsView
      execution={execution}
    />
  );
}