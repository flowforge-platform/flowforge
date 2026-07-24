import { executionDetails } from "@/mocks/execution-details";

export async function getExecutionDetails(id: string) {
  return (
    executionDetails.find(
      (execution) => execution.id === id
    ) ?? null
  );
}