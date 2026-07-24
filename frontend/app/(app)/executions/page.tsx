import ExecutionsView from "@/components/executions/ExecutionsView";
import { getExecutionsData } from "@/lib/api/executions";

export default async function ExecutionsPage() {
  const data = await getExecutionsData();

  return (
    <main className="min-h-screen p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">
            Execution History
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Monitor all active and past workflow executions.
          </p>
        </header>

        <ExecutionsView data={data} />
      </div>
    </main>
  );
}