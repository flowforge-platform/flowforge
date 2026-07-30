import TemplatesView from "@/components/templates/TemplatesView";
import { getTemplatesData } from "@/lib/api/templates";

export default async function TemplatesPage() {
  const data = await getTemplatesData();

  return (
    <main className="min-h-screen p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px]">
        <TemplatesView data={data} />
      </div>
    </main>
  );
}