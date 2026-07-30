import { FailedWorkflow } from "@/types/monitoring";

interface Props {
  workflows: FailedWorkflow[];
}

export default function FailedWorkflows({
  workflows,
}: Props) {
  return (
    <section className="rounded-xl border bg-card p-5">
      <h2 className="text-lg font-semibold">
        Failed Workflows
      </h2>

      <div className="mt-5 space-y-4">
        {workflows.map((workflow) => (
          <div
            key={workflow.id}
            className="flex items-center justify-between"
          >
            <div>
              <p>{workflow.workflowName}</p>
            </div>

            <span className="text-sm text-destructive">
              {workflow.reason}
            </span>
          </div>  
        ))}
      </div>
    </section>
  );
}