import { WorkflowTemplate } from "@/types/template";

import CustomSolutionCard from "./CustomSolutionCard";
import RecentlyAddedTemplates from "./RecentlyAddedTemplates";

interface TemplatesBottomSectionProps {
  templates: WorkflowTemplate[];
}

export default function TemplatesBottomSection({
  templates,
}: TemplatesBottomSectionProps) {
  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <RecentlyAddedTemplates
        templates={templates}
      />

      <CustomSolutionCard />
    </section>
  );
}