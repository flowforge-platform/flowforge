"use client";

import { Switch } from "@/components/ui/switch";

import { NotificationSetting } from "@/types/settings";

interface NotificationSettingsProps {
  notifications: NotificationSetting[];
}

export default function NotificationSettings({
  notifications,
}: NotificationSettingsProps) {
  return (
    <section
      id="notifications"
      className="rounded-xl border bg-card p-6"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Notifications
        </h2>

        <p className="text-sm text-muted-foreground">
          Choose which events should notify you.
        </p>
      </div>

      <div className="space-y-6">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-start justify-between gap-6"
          >
            <div className="space-y-1">
              <h3 className="font-medium">
                {notification.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                {notification.description}
              </p>
            </div>

            <Switch
              checked={notification.enabled}
            />
          </div>
        ))}
      </div>
    </section>
  );
}