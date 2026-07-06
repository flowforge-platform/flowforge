import { Workflow } from "@/types/workflow";

const workflows: Workflow[] = [];

class WorkflowService {
  async save(workflow: Workflow) {
    const index = workflows.findIndex(
      (w) => w.id === workflow.id
    );

    if (index === -1) {
      workflows.push(workflow);
    } else {
      workflows[index] = workflow;
    }

    return workflow;
  }

  async getAll() {
    return workflows;
  }

  async getById(id: string) {
    return workflows.find((w) => w.id === id);
  }

  async delete(id: string) {
    const index = workflows.findIndex(
      (workflow) => workflow.id === id
    );

    if(index!==-1){
      workflows.splice(index, 1)
    }
  }

}

export const workflowService =
  new WorkflowService();