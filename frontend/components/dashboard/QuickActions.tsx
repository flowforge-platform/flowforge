"use client";

import { useRouter } from "next/navigation";
import {
  Plus,
  Play,
  LayoutTemplate,
  History,
  ChevronRight,
} from "lucide-react";

export default function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      label: "Create Workflow",
      description: "Build a new automation",
      icon: Plus,
      isPrimary: true,
      iconBg: "bg-[#8174ff]/15 text-[#a49aff] border border-[#8174ff]/30",
      onClick: () => router.push("/workflows/new"),
    },
    {
      label: "Run Workflow",
      description: "Execute an existing workflow",
      icon: Play,
      isPrimary: false,
      iconBg: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
      onClick: () => router.push("/workflows"),
    },
    {
      label: "Browse Templates",
      description: "Start from a template",
      icon: LayoutTemplate,
      isPrimary: false,
      iconBg: "bg-violet-500/10 text-violet-400 border border-violet-500/20",
      onClick: () => router.push("/templates"),
    },
    {
      label: "View History",
      description: "Check past executions",
      icon: History,
      isPrimary: false,
      iconBg: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
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
              className={`group flex w-full items-center justify-between rounded-lg border p-3 text-left transition-all ${
                action.isPrimary
                  ? "border-[#8174ff]/30 bg-[#8174ff]/[0.04] hover:bg-[#8174ff]/10 hover:border-[#8174ff]/50"
                  : "border-border bg-card hover:bg-muted/60 hover:border-muted-foreground/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-lg p-2 transition-transform group-hover:scale-105 ${action.iconBg}`}>
                  <Icon className="size-4" />
                </div>

                <div>
                  <p className="text-sm font-medium transition-colors group-hover:text-foreground">
                    {action.label}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </div>

              <ChevronRight className="size-4 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-foreground group-hover:opacity-100" />
            </button>
          );
        })}
      </div>
    </section>
  );
}