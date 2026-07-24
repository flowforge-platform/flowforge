import { Star } from "lucide-react";

import { WorkflowTemplate } from "@/types/template";

import TemplateCard from "./TemplateCard";

interface PopularTemplatesProps {
  templates: WorkflowTemplate[];
}

export default function PopularTemplates({
  templates,
}: PopularTemplatesProps) {
  return (
    <section className="space-y-5">
      <div className="flex items-center gap-3">
        <Star className="size-5 fill-current text-cyan-400" />

        <h2 className="text-xl font-semibold">
          Popular Templates
        </h2>
      </div>

      {templates.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-52 items-center justify-center rounded-xl border bg-card">
          <div className="text-center">
            <p className="font-medium">
              No popular templates found
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