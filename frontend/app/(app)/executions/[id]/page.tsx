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

  return <ExecutionDetailsView executionId={id} />;
}