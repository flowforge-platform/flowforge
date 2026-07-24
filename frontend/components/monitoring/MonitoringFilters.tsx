"use client";

import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

import { MonitoringRange } from "@/types/monitoring";

interface MonitoringFiltersProps {
  range: MonitoringRange;
  onRangeChange: (
    range: MonitoringRange
  ) => void;
}

export default function MonitoringFilters({
  range,
  onRangeChange,
}: MonitoringFiltersProps) {
  return (
    <div className="flex items-center gap-3">
      <ToggleGroup
        type="single"
        value={range}
        onValueChange={(value) => {
          if (value) {
            onRangeChange(
              value as MonitoringRange
            );
          }
        }}
      >
        <ToggleGroupItem value="24H">
          Last 24 Hours
        </ToggleGroupItem>

        <ToggleGroupItem value="7D">
          Last 7 Days
        </ToggleGroupItem>
      </ToggleGroup>

      <Button
        variant="outline"
      >
        <RefreshCw className="size-4" />
        Refresh
      </Button>
    </div>
  );
}