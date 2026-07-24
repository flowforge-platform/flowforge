import {
  Braces,
  ChevronRight,
  Mail,
} from "lucide-react";

import { WorkflowTemplate } from "@/types/template";

interface RecentlyAddedTemplatesProps {
  templates: WorkflowTemplate[];
}

export default function RecentlyAddedTemplates({
  templates,
}: RecentlyAddedTemplatesProps) {
  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Recently Added
        </h2>

        <button
          type="button"
          className="text-sm text-primary transition-colors hover:text-primary/80"
        >
          View All →
        </button>
      </div>

      {templates.length > 0 ? (
        <div className="space-y-2">
          {templates.map((template) => (
            <RecentTemplateRow
              key={template.id}
              template={template}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-40 items-center justify-center rounded-xl border bg-card">
          <div className="text-center">
            <p className="font-medium">
              No recently added templates
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Try changing your template filters.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

function RecentTemplateRow({
  template,
}: {
  template: WorkflowTemplate;
}) {
  const Icon =
    template.name === "Email Drip Campaign"
      ? Mail
      : Braces;

  return (
    <div className="group flex items-center gap-4 rounded-xl p-4 transition-colors hover:bg-muted/30">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border bg-muted">
        <Icon className="size-5 text-muted-foreground" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-medium">
          {template.name}
        </h3>

        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
          {template.description}
        </p>
      </div>

      <div className="hidden shrink-0 text-right sm:block">
        <p className="text-xs text-muted-foreground">
          Nodes
        </p>

        <p className="mt-1 text-sm font-medium">
          {template.nodeCount}
        </p>
      </div>

      <button
        type="button"
        aria-label={`View ${template.name}`}
        className="flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}