"use client";

import { KeyRound, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import { SecuritySettings as SecuritySettingsType } from "@/types/settings";

interface SecuritySettingsProps {
  security: SecuritySettingsType;
}

export default function SecuritySettings({
  security,
}: SecuritySettingsProps) {
  return (
    <section
      id="security"
      className="rounded-xl border bg-card p-6"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Security
        </h2>

        <p className="text-sm text-muted-foreground">
          Manage authentication and account security.
        </p>
      </div>

      <div className="space-y-6">

        {/* Two Factor */}

        <div className="flex items-center justify-between gap-6">
          <div>
            <h3 className="font-medium">
              Two-Factor Authentication
            </h3>

            <p className="text-sm text-muted-foreground">
              Require an additional verification step during sign in.
            </p>
          </div>

          <Switch
            checked={security.twoFactorEnabled}
          />
        </div>

        {/* Session Management */}

        <div className="flex items-center justify-between gap-6">
          <div>
            <h3 className="font-medium">
              Session Management
            </h3>

            <p className="text-sm text-muted-foreground">
              View and manage active login sessions.
            </p>
          </div>

          <Switch
            checked={security.sessionManagementEnabled}
          />
        </div>

        {/* Actions */}

        <div className="flex flex-wrap gap-3 pt-2">

          <Button variant="outline">
            <KeyRound className="mr-2 size-4" />
            Change Password
          </Button>

          <Button variant="destructive">
            <LogOut className="mr-2 size-4" />
            Logout Everywhere
          </Button>

        </div>

      </div>
    </section>
  );
}