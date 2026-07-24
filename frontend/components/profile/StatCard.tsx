"use client";

import {
  Activity,
  CheckCircle2,
  FileStack,
  Workflow,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { ProfileStat } from "@/types/profile";

interface StatCardProps {
  stat: ProfileStat;
}

const iconMap = {
  workflow: Workflow,
  execution: Activity,
  approval: CheckCircle2,
  template: FileStack,
};

export default function StatCard({
  stat,
}: StatCardProps) {
  const Icon = iconMap[stat.icon];

  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">

        <div>
          <p className="text-sm text-muted-foreground">
            {stat.label}
          </p>

          <p className="mt-2 text-3xl font-bold">
            {stat.value}
          </p>
        </div>

        <div className="rounded-lg bg-primary/10 p-3">
          <Icon className="size-6 text-primary" />
        </div>

      </CardContent>
    </Card>
  );
}