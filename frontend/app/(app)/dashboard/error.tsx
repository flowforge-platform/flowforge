"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

interface DashboardErrorProps {
  reset: () => void;
}

export default function DashboardError({
  reset,
}: DashboardErrorProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="max-w-md text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="size-6 text-destructive" />
        </div>

        <h2 className="mt-4 text-xl font-semibold">
          Unable to load dashboard
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong while loading your dashboard data.
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          <RefreshCw className="size-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}