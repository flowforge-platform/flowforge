"use client";

import { ListFilter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

import { ApprovalFilter } from "@/types/approval";

interface ApprovalFiltersProps {
  value: ApprovalFilter;
  onValueChange: (value: ApprovalFilter) => void;
}

export default function ApprovalFilters({
  value,
  onValueChange,
}: ApprovalFiltersProps) {
  return (
    <div className="flex items-center gap-2">
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(newValue) => {
          if (newValue) {
            onValueChange(
              newValue as ApprovalFilter
            );
          }
        }}
        variant="outline"
        className="rounded-lg border bg-card p-1"
      >
        <ToggleGroupItem
          value="ALL"
          className="h-8 px-4 text-xs data-[state=on]:bg-muted"
        >
          All
        </ToggleGroupItem>

        <ToggleGroupItem
          value="URGENT"
          className="h-8 px-4 text-xs data-[state=on]:bg-muted"
        >
          Urgent
        </ToggleGroupItem>

        <ToggleGroupItem
          value="RECENT"
          className="h-8 px-4 text-xs data-[state=on]:bg-muted"
        >
          Recent
        </ToggleGroupItem>
      </ToggleGroup>

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-10 gap-2"
      >
        <ListFilter className="size-4" />
        Filter
      </Button>
    </div>
  );
}