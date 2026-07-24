"use client";

import { Settings } from "@/types/settings";
import SettingsSidebar from "./SettingsSidebar";
import UsageCard from "./UsageCard";
import GeneralSettings from "./GeneralSettings";
import NotificationSettings from "./NotificationSettings";
import ExecutionSettings from "./ExecutionSettings";
import SecuritySettings from "./SecuritySettings";
import ApiSettings from "./ApiSettings";

interface SettingsViewProps {
  settings: Settings;
}

export default function SettingsView({
  settings,
}: SettingsViewProps) {
  return (
    <main className="space-y-8 p-8">

      {/* Header */}

      <section>

        <p className="mt-2 text-muted-foreground">
          Configure platform preferences and technical overrides.
        </p>
      </section>

      {/* Layout */}

      <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">

        {/* Sidebar */}

        <aside className="space-y-6">

          <SettingsSidebar/>

          <UsageCard
              usage={settings.usage}
            />

        </aside>

        {/* Content */}

        <section className="space-y-10">

          <GeneralSettings
            general={settings.general} />

          <NotificationSettings
            notifications={settings.notifications} />

          <ExecutionSettings
            execution={settings.execution} />

          <SecuritySettings
            security={settings.security} />

          <ApiSettings
            api={settings.api} />

        </section>

      </div>

    </main>
  );
}