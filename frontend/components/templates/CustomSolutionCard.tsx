import {
  Blocks,
  Code2,
  Workflow,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    label: "Drag-and-drop node logic",
    icon: Workflow,
  },
  {
    label: "500+ pre-built integrations",
    icon: Blocks,
  },
  {
    label: "Custom Python/Node.js steps",
    icon: Code2,
  },
];

export default function CustomSolutionCard() {
  return (
    <aside className="flex h-full flex-col rounded-xl border bg-card p-6">
      <div>
        <h2 className="text-xl font-semibold">
          Custom Solution?
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Can&apos;t find what you&apos;re looking for?
          Build a custom workflow from scratch using our
          visual canvas editor.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.label}
              className="flex items-center gap-3"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Icon className="size-4 text-primary" />
              </div>

              <span className="text-sm">
                {feature.label}
              </span>
            </div>
          );
        })}
      </div>

      <Button
          asChild
          className="mt-8 w-full"
        >
          <Link href="/workflows/new">
            Start Designing
          </Link>
        </Button>
    </aside>
  );
}