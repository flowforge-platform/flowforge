"use client";

import {
  Copy,
  KeyRound,
  RefreshCw,
  Webhook,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ApiSettings as ApiSettingsType } from "@/types/settings";
import SettingsSection from "./SettingsSection";

interface ApiSettingsProps {
  api: ApiSettingsType;
}

export default function ApiSettings({
  api,
}: ApiSettingsProps) {
  return (

    <SettingsSection
      id="api"
      title="API & Webhooks"
      description="Manage API credentials and webhook configuration.">

      <div className="space-y-6">

        {/* API Key */}

        <div className="space-y-3">
          <label className="text-sm font-medium">
            API Key
          </label>

          <div className="flex gap-2">
            <Input
              value={api.apiKey}
              readOnly
            />

            <Button
              variant="outline"
              size="icon"
            >
              <Copy className="size-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
            >
              <RefreshCw className="size-4" />
            </Button>
          </div>
        </div>

        {/* Webhook Secret */}

        <div className="space-y-3">
          <label className="text-sm font-medium">
            Webhook Secret
          </label>

          <div className="flex gap-2">
            <Input
              value={api.webhookSecret}
              readOnly
            />

            <Button
              variant="outline"
              size="icon"
            >
              <Copy className="size-4" />
            </Button>
          </div>
        </div>

        {/* Webhook URL */}

        <div className="space-y-3">
          <label className="text-sm font-medium">
            Webhook Endpoint
          </label>

          <div className="flex items-center gap-2 rounded-lg border p-3">
            <Webhook className="size-4 text-primary" />

            <span className="text-sm">
              https://api.flowforge.dev/webhooks
            </span>
          </div>
        </div>

      </div>
    </SettingsSection>
  );
}