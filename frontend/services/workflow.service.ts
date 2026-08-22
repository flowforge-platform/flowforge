import { Workflow } from "@/types/workflow";
import { WorkflowDefinition } from "@/types/workflow-definition";
import { toWorkflowDefinition, fromWorkflowDefinition } from "@/lib/mappers/workflow.mapper";
import { Edge, Node } from "@xyflow/react";

import {
  createWorkflow,
  deleteWorkflow,
  getWorkflowById,
  getWorkflowDefinition,
  getWorkflows,
  publishWorkflow,
  updateWorkflow,
  updateWorkflowDefinition,
} from "@/lib/api/workflow";

class WorkflowService {
  async create(
    workflow: {
      name: string;
      description: string;
    },
    nodes: Node[],
    edges: Edge[]
  ) {
    const createdWorkflow = await createWorkflow(workflow);

    const definition = toWorkflowDefinition(nodes, edges);

    await updateWorkflowDefinition(
      createdWorkflow.id,
      definition
    );

    return createdWorkflow;
  }

  async update(
    id: string,
    workflow: {
      name: string;
      description: string;
    },
    nodes: Node[],
    edges: Edge[]
  ) {
    const updatedWorkflow = await updateWorkflow(
      id,
      workflow
    );

    if (updatedWorkflow.status !== "PUBLISHED") {
      const definition = toWorkflowDefinition(
        nodes,
        edges
      );

      await updateWorkflowDefinition(
        id,
        definition
      );
    }

    return updatedWorkflow;
  }

  async getAll() {
    return await getWorkflows();
  }

  async getById(id: string) {
    return await getWorkflowById(id);
  }

  async delete(id: string) {
    return await deleteWorkflow(id);
  }

  async getDefinition(workflowId: string) { }

  async updateDefinition(
    workflowId: string,
    definition: WorkflowDefinition
  ) { }

  async publish(workflowId: string) {
    return await publishWorkflow(workflowId);
  }

  async loadWorkflow(id: string) {
    const workflow = await getWorkflowById(id);

    const definition = await getWorkflowDefinition(id);

    const { nodes, edges } =
      fromWorkflowDefinition(definition);

    return {
      id: workflow.id,
      name: workflow.name,
      description: workflow.description,
      status: workflow.status,

      nodes,
      edges,

      createdAt: workflow.createdAt,
      updatedAt: workflow.updatedAt,
    };
  }
}

export const workflowService = new WorkflowService();