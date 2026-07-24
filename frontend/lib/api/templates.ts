import { mockTemplatesData } from "@/mocks/templates";
import { TemplatesData } from "@/types/template";

export async function getTemplatesData(): Promise<TemplatesData> {
  return mockTemplatesData;
}