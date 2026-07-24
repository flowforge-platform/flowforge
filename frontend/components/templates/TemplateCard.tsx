import {
  GitBranch,
  Heart,
  Layers3,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  TemplateCategory,
  TemplateDifficulty,
  WorkflowTemplate,
} from "@/types/template";

interface TemplateCardProps {
  template: WorkflowTemplate;
}

const categoryConfig: Record<
  TemplateCategory,
  {
    label: string;
    className: string;
  }
> = {
  ONBOARDING: {
    label: "Onboarding",
    className:
      "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",
  },
  APPROVALS: {
    label: "Approvals",
    className:
      "border-violet-500/20 bg-violet-500/10 text-violet-400",
  },
  REPORTING: {
    label: "Reporting",
    className:
      "border-blue-500/20 bg-blue-500/10 text-blue-400",
  },
  INCIDENT_RESPONSE: {
    label: "Response",
    className:
      "border-red-500/20 bg-red-500/10 text-red-400",
  },
};

const difficultyLabels: Record<
  TemplateDifficulty,
  string
> = {
  SIMPLE: "Simple",
  MODERATE: "Moderate",
  ADVANCED: "Advanced",
};

export default function TemplateCard({
  template,
}: TemplateCardProps) {
  const category =
    categoryConfig[template.category];

  return (
    <article className="flex h-full flex-col rounded-xl border bg-card p-5">
      {/* Top */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex size-11 items-center justify-center rounded-xl bg-muted">
          <Layers3 className="size-5 text-primary" />
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <span
            className={`rounded-md border px-2 py-1 text-[10px] font-medium ${category.className}`}
          >
            {category.label}
          </span>

          {template.version && (
            <span className="rounded-md border bg-muted/50 px-2 py-1 text-[10px] text-muted-foreground">
              {template.version}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mt-5">
        <h3 className="text-xl font-semibold tracking-tight">
          {template.name}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-relaxed text-muted-foreground">
          {template.description}
        </p>
      </div>

      {/* Workflow preview */}
      <TemplateWorkflowPreview
        category={template.category}
      />

      {/* Metadata */}
      <div className="mt-5 flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <GitBranch className="size-4" />
          <span>{template.nodeCount} Nodes</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="flex items-end gap-0.5">
            <span className="h-1.5 w-0.5 bg-current" />
            <span className="h-2.5 w-0.5 bg-current" />
            <span className="h-3.5 w-0.5 bg-current" />
          </span>

          <span>
            {difficultyLabels[template.difficulty]}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Heart className="size-4" />
          <span>{formatCompactNumber(template.likes)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
        >
          Preview
        </Button>

        <Button type="button">
          Use Template
        </Button>
      </div>
    </article>
  );
}

function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

interface TemplateWorkflowPreviewProps {
  category: TemplateCategory;
}

function TemplateWorkflowPreview({
  category,
}: TemplateWorkflowPreviewProps) {
  if (category === "APPROVALS") {
    return (
      <div className="relative mt-6 h-24 overflow-hidden rounded-lg border bg-background/50">
        <div className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />

        <div className="absolute left-1/2 top-[25%] size-2 -translate-x-1/2 rounded-full bg-primary/70" />

        <div className="absolute left-1/2 bottom-[25%] size-2 -translate-x-1/2 rounded-full bg-primary/70" />

        <div className="absolute left-[35%] top-1/2 size-2 -translate-y-1/2 rounded-full bg-primary/70" />

        <div className="absolute right-[35%] top-1/2 size-2 -translate-y-1/2 rounded-full bg-primary/70" />
      </div>
    );
  }

  return (
    <div className="relative mt-6 h-24 overflow-hidden rounded-lg border bg-background/50">
      <div className="absolute left-[10%] top-1/2 size-2 -translate-y-1/2 rounded-full bg-primary" />

      <div className="absolute left-[12%] right-[12%] top-1/2 h-px bg-border" />

      <div className="absolute left-1/2 top-[43%] size-2 -translate-x-1/2 rounded-full bg-primary" />

      <div className="absolute left-1/2 top-[55%] size-2 -translate-x-1/2 rounded-full bg-primary/70" />

      <div className="absolute right-[10%] top-1/2 size-2 -translate-y-1/2 rounded-full bg-primary" />
    </div>
  );
}