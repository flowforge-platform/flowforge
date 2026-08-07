import { api } from "./axios";
import { CreateWorkflowRequest, UpdateWorkflowRequest } from "@/types/workflow";
import { Workflow } from "@/types/workflow";
import { WorkflowDefinition } from "@/types/workflow-definition";

export const createWorkflow = async (
  data: CreateWorkflowRequest
) => {
  const response = await api.post(
    "/api/v1/workflows",
    data
  );

  return response.data;
};

export const getWorkflows = async (): Promise<Workflow[]> => {
  const response = await api.get("/api/v1/workflows");

  return response.data;
};

export const getWorkflowById = async (
  id: string
): Promise<Workflow> => {
  const response = await api.get(`/api/v1/workflows/${id}`);

  return response.data;
};

export const updateWorkflow = async (
  id: string,
  data: UpdateWorkflowRequest
): Promise<Workflow> => {
  const response = await api.put(
    `/api/v1/workflows/${id}`,
    data
  );

  return response.data;
};

export const deleteWorkflow = async (
  id: string
): Promise<void> => {
  await api.delete(`/api/v1/workflows/${id}`);
};

//Workflow definition

export const getWorkflowDefinition = async (
  workflowId: string
): Promise<WorkflowDefinition> => {
  const response = await api.get(
    `/api/v1/workflows/${workflowId}/definition`
  );

  return response.data;
};

export const updateWorkflowDefinition = async (
  workflowId: string,
  definition: WorkflowDefinition
): Promise<void> => {
  await api.put(
    `/api/v1/workflows/${workflowId}/definition`,
    definition
  );
};