"use client";

import {
  AlertCircle,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface TemplatesErrorProps {
  reset: () => void;
}

export default function TemplatesError({
  reset,
}: TemplatesErrorProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-md text-center">

        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="size-6 text-destructive" />
        </div>

        <h2 className="mt-4 text-xl font-semibold">
          Unable to load templates
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong while loading workflow templates.
        </p>

        <Button
          className="mt-6"
          onClick={reset}
        >
          <RefreshCw className="size-4" />
          Try Again
        </Button>

      </div>
    </div>
  );
}