"use client";

import { useMemo, useState } from "react";

import {
  TemplateCategoryFilter,
  TemplatesData,
  TemplateScope,
} from "@/types/template";

import TemplateCategoryFilters from "./TemplateCategoryFilters";
import TemplateScopeTabs from "./TemplateScopeTabs";
import PopularTemplates from "./PopularTemplates";
import TemplatesBottomSection from "./TemplatesBottomSection";
import TemplatesEmptyState from "./TemplatesEmptyState";

interface TemplatesViewProps {
  data: TemplatesData;
}

export default function TemplatesView({
  data,
}: TemplatesViewProps) {
  const [scope, setScope] =
    useState<TemplateScope>("ALL");

  const [category, setCategory] =
    useState<TemplateCategoryFilter>("ALL");

  const filteredTemplates = useMemo(() => {
    return data.templates.filter((template) => {
      const matchesScope =
        scope === "ALL" ||
        template.scope === scope;

      const matchesCategory =
        category === "ALL" ||
        template.category === category;

      return matchesScope && matchesCategory;
    });
  }, [data.templates, scope, category]);

  const popularTemplates = useMemo(() => {
    return filteredTemplates.filter(
      (template) => template.isPopular
    );
  }, [filteredTemplates]);

  const recentTemplates = useMemo(() => {
    return [...filteredTemplates]
      .filter((template) => !template.isPopular)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
  }, [filteredTemplates]);

  const hasTemplates =
    filteredTemplates.length > 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Workflow Templates
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Accelerate your automation with pre-configured
            workflows and battle-tested blueprints.
          </p>
        </div>

        <TemplateScopeTabs
          value={scope}
          onValueChange={setScope}
        />
      </div>

      {!hasTemplates ? (

        <TemplatesEmptyState />

      ) : (

        <>
          <PopularTemplates
            templates={popularTemplates}
          />

          <TemplatesBottomSection
            templates={recentTemplates}
          />
        </>
      )}
    </div>
  );
}