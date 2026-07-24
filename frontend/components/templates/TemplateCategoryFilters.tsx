"use client";

import {
  CircleCheckBig,
  Grid2X2,
  Siren,
  UserPlus,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

import { TemplateCategoryFilter } from "@/types/template";

interface TemplateCategoryFiltersProps {
  value: TemplateCategoryFilter;
  onValueChange: (
    value: TemplateCategoryFilter
  ) => void;
}

const categories: {
  value: TemplateCategoryFilter;
  label: string;
  icon: typeof Grid2X2;
}[] = [
  {
    value: "ALL",
    label: "All",
    icon: Grid2X2,
  },
  {
    value: "ONBOARDING",
    label: "Onboarding",
    icon: UserPlus,
  },
  {
    value: "APPROVALS",
    label: "Approvals",
    icon: CircleCheckBig,
  },
  {
    value: "REPORTING",
    label: "Reporting",
    icon: ChartNoAxesColumnIncreasing,
  },
  {
    value: "INCIDENT_RESPONSE",
    label: "Incident Response",
    icon: Siren,
  },
];

export default function TemplateCategoryFilters({
  value,
  onValueChange,
}: TemplateCategoryFiltersProps) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(newValue) => {
        if (newValue) {
          onValueChange(
            newValue as TemplateCategoryFilter
          );
        }
      }}
      className="flex flex-wrap justify-start gap-2"
    >
      {categories.map((category) => {
        const Icon = category.icon;

        return (
          <ToggleGroupItem
            key={category.value}
            value={category.value}
            variant="outline"
            className="
              h-10 rounded-full border px-5
              text-sm text-muted-foreground
              data-[state=on]:border-primary
              data-[state=on]:bg-primary/10
              data-[state=on]:text-primary
            "
          >
            <Icon className="size-4" />
            {category.label}
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
}