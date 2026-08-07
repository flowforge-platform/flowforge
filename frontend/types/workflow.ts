export interface Workflow {
  id: string;
  organizationId: string;
  createdBy: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWorkflowRequest {
  name: string;
  description: string;
}

export interface UpdateWorkflowRequest {
  name: string;
  description: string;
}