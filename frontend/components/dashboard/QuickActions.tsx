"use client";

import { useRouter } from "next/navigation";
import {
  Plus,
  Play,
  LayoutTemplate,
  History,
} from "lucide-react";

export default function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      label: "Create Workflow",
      description: "Build a new automation",
      icon: Plus,
      onClick: () => router.push("/workflows/new"),
    },
    {
      label: "Run Workflow",
      description: "Execute an existing workflow",
      icon: Play,
      onClick: () => router.push("/workflows"),
    },
    {
      label: "Browse Templates",
      description: "Start from a template",
      icon: LayoutTemplate,
      onClick: () => router.push("/templates"),
    },
    {
      label: "View History",
      description: "Check past executions",
      icon: History,
      onClick: () => router.push("/executions"),
    },
  ];

  return (
    <section className="rounded-xl border bg-card p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">Quick Actions</h2>
        <p className="text-sm text-muted-foreground">
          Common workflow actions
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              type="button"
              onClick={action.onClick}
              className="flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-muted"
            >
              <div className="rounded-lg bg-muted p-2">
                <Icon className="size-4" />
              </div>

              <div>
                <p className="text-sm font-medium">
                  {action.label}
                </p>

                <p className="text-xs text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}