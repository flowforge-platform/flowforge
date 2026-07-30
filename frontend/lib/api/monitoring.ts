import { mockMonitoringData } from "@/mocks/monitoring";
import { MonitoringData } from "@/types/monitoring";

export async function getMonitoringData(): Promise<MonitoringData> {
  return mockMonitoringData;
}