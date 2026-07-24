"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { GeneralSettings as GeneralSettingsType } from "@/types/settings";

interface GeneralSettingsProps {
  general: GeneralSettingsType;
}

export default function GeneralSettings({
  general,
}: GeneralSettingsProps) {
  return (
    <section
      id="general"
      className="rounded-xl border bg-card p-6"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          General
        </h2>

        <p className="text-sm text-muted-foreground">
          Configure your workspace preferences.
        </p>
      </div>

      <div className="space-y-6">
        {/* Theme */}

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Theme
          </label>

          <Select defaultValue={general.theme}>
            <SelectTrigger className="max-w-sm">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="light">
                Light
              </SelectItem>

              <SelectItem value="dark">
                Dark
              </SelectItem>

              <SelectItem value="system">
                System
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Timezone */}

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Timezone
          </label>

          <Select defaultValue={general.timezone}>
            <SelectTrigger className="max-w-sm">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="UTC (Coordinated Universal Time)">
                UTC (Coordinated Universal Time)
              </SelectItem>

              <SelectItem value="Asia/Kolkata">
                Asia/Kolkata
              </SelectItem>

              <SelectItem value="America/New_York">
                America/New_York
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Format */}

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Date Format
          </label>

          <Select defaultValue={general.dateFormat}>
            <SelectTrigger className="max-w-sm">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="YYYY-MM-DD">
                YYYY-MM-DD
              </SelectItem>

              <SelectItem value="DD/MM/YYYY">
                DD/MM/YYYY
              </SelectItem>

              <SelectItem value="MM/DD/YYYY">
                MM/DD/YYYY
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
}