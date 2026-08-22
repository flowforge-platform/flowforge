import { api } from "./axios";
import { getWorkflows } from "./workflow";
import {
  GetExecutionResponse,
  Execution,
} from "@/types/execution";

export async function startExecution(workflowId: string) {
  const response = await api.post(
    `/api/v1/executions/${workflowId}`
  );
  return response.data;
}

export async function getExecution(
  executionId: string
): Promise<GetExecutionResponse> {
  const response = await api.get<GetExecutionResponse>(
    `/api/v1/executions/${executionId}`
  );
  return response.data;
}

export async function getExecutionTasks(executionId: string) {
  const response = await api.get(
    `/api/v1/executions/${executionId}/tasks`
  );
  return response.data;
}

export async function getExecutionsData(): Promise<Execution[]> {
  const response = await api.get<GetExecutionResponse[]>("/api/v1/executions");
  const rawExecutions = response.data || [];

  const workflowMap = new Map<string, string>();

  try {
    const workflows = await getWorkflows();
    if (Array.isArray(workflows)) {
      workflows.forEach((w) => {
        if (w.id) {
          workflowMap.set(w.id, w.name || "Untitled Workflow");
        }
      });
    }
  } catch (err) {
    // If fetching workflow list fails, fall back gracefully
  }

  return rawExecutions.map((item) => {
    let duration: number | null = null;
    if (item.startedAt && item.completedAt) {
      const startTime = new Date(item.startedAt).getTime();
      const endTime = new Date(item.completedAt).getTime();
      duration = Math.max(0, Math.round((endTime - startTime) / 1000));
    }

    const workflowName =
      workflowMap.get(item.workflowId) ||
      `Workflow (${item.workflowId.substring(0, 8)})`;

    return {
      id: item.executionId,
      workflow: {
        id: item.workflowId,
        name: workflowName,
      },
      status: (item.status || "PENDING").toUpperCase(),
      startedAt: item.startedAt,
      completedAt: item.completedAt,
      duration,
    };
  });
}