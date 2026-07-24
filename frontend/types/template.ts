export type TemplateCategory =
  | "ONBOARDING"
  | "APPROVALS"
  | "REPORTING"
  | "INCIDENT_RESPONSE";

export type TemplateDifficulty =
  | "SIMPLE"
  | "MODERATE"
  | "ADVANCED";

export type TemplateCategoryFilter =
  | "ALL"
  | TemplateCategory;
  
export type TemplateScope =
  | "ALL"
  | "MY_TEMPLATES"
  | "SHARED";

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;

  category: TemplateCategory;
  difficulty: TemplateDifficulty;

  nodeCount: number;
  likes: number;

  version?: string;

  scope: Exclude<TemplateScope, "ALL">;

  createdAt: string;

  isPopular: boolean;
}

export interface TemplatesData {
  templates: WorkflowTemplate[];
}