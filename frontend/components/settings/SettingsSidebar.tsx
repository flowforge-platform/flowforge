"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const sidebarItems = [
  {
    id: "general",
    label: "General",
  },
  {
    id: "notifications",
    label: "Notifications",
  },
  {
    id: "execution",
    label: "Execution",
  },
  {
    id: "security",
    label: "Security",
  },
  {
    id: "api",
    label: "API & Webhooks",
  },
];

export default function SettingsSidebar() {
  return (
    <div className="space-y-6">

      <div>

        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Preference Layers
        </p>

        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const active = item.id === "general";
        
            return (
              <Button
                key={item.id}
                variant={active ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                {item.label}
              </Button>
            );
          })}
        </nav>

      </div>

    </div>
  );
}