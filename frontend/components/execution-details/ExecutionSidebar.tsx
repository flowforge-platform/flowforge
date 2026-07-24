"use client";

import { ExecutionDetails } from "@/types/execution-details";

interface ExecutionSidebarProps {
  execution: ExecutionDetails;
}

export default function ExecutionSidebar({
  execution,
}: ExecutionSidebarProps) {
  return (
    <aside className="w-64 border-r bg-background p-5">

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Execution Stats
        </h2>

        <div className="space-y-3">
          <StatCard
            label="Success"
            value={execution.stats.success}
          />

          <StatCard
            label="Active"
            value={execution.stats.active}
          />

          <StatCard
            label="Error"
            value={execution.stats.error}
          />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Infrastructure
        </h2>

        <div className="rounded-lg border px-4">
          <InfoRow
            label="Worker"
            value={execution.infrastructure.worker}
          />

          <InfoRow
            label="Memory"
            value={execution.infrastructure.memory}
          />
        </div>
      </section>

    </aside>
  );
}

interface StatCardProps {
  label: string;
  value: number;
}

function StatCard({
  label,
  value,
}: StatCardProps) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({
  label,
  value,
}: InfoRowProps) {
  return (
    <div className="flex items-center justify-between border-b py-3 last:border-none">
      <span className="text-muted-foreground">
        {label}
      </span>

      <span className="font-medium">
        {value}
      </span>
    </div>
  );
}

