import MonitoringView from "@/components/monitoring/MonitoringView";
import { getMonitoringData } from "@/lib/api/monitoring";

export default async function MonitoringPage() {
  const data = await getMonitoringData();

  return (
    <main className="min-h-screen p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px]">
        <MonitoringView data={data} />
      </div>
    </main>
  );
}