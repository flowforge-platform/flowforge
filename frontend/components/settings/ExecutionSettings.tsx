"use client";

import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ExecutionSettings as ExecutionSettingsType } from "@/types/settings";
import SettingsSection from "./SettingsSection";

interface ExecutionSettingsProps {
  execution: ExecutionSettingsType;
}

export default function ExecutionSettings({
  execution,
}: ExecutionSettingsProps) {
  return (
    <SettingsSection
      id="execution"
      title="Execution Preferences"
      description="Configure how workflow executions are monitored.">

      <div className="space-y-6">

        {/* Auto Reconnect */}

        <div className="flex items-center justify-between gap-6">
          <div>
            <h3 className="font-medium">
              Auto Reconnect
            </h3>

            <p className="text-sm text-muted-foreground">
              Automatically reconnect to live executions after a disconnect.
            </p>
          </div>

          <Switch checked={execution.autoReconnect} />
        </div>

        {/* Refresh Interval */}

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Refresh Interval
          </label>

          <Select defaultValue={execution.refreshInterval}>
            <SelectTrigger className="max-w-sm">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="5s">5 seconds</SelectItem>
              <SelectItem value="10s">10 seconds</SelectItem>
              <SelectItem value="30s">30 seconds</SelectItem>
              <SelectItem value="60s">60 seconds</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Log Retention */}

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Log Retention
          </label>

          <Select defaultValue={execution.logRetention}>
            <SelectTrigger className="max-w-sm">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="7 Days">7 Days</SelectItem>
              <SelectItem value="30 Days">30 Days</SelectItem>
              <SelectItem value="90 Days">90 Days</SelectItem>
              <SelectItem value="365 Days">365 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

      </div>
    </SettingsSection>
  );
}