"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { TemplateScope } from "@/types/template";

interface TemplateScopeTabsProps {
  value: TemplateScope;
  onValueChange: (value: TemplateScope) => void;
}

export default function TemplateScopeTabs({
  value,
  onValueChange,
}: TemplateScopeTabsProps) {
  return (
    <Tabs
      value={value}
      onValueChange={(value) =>
        onValueChange(value as TemplateScope)
      }
    >
      <TabsList className="h-11 rounded-lg border bg-card p-1">
        <TabsTrigger
          value="ALL"
          className="h-9 px-5 text-xs"
        >
          All Templates
        </TabsTrigger>

        <TabsTrigger
          value="MY_TEMPLATES"
          className="h-9 px-5 text-xs"
        >
          My Templates
        </TabsTrigger>

        <TabsTrigger
          value="SHARED"
          className="h-9 px-5 text-xs"
        >
          Shared
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}