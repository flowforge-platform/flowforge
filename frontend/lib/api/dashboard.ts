import { mockDashboardData } from "@/mocks/dashboard";
import { delay } from "@/mocks/delay";
import { DashboardData } from "@/types/dashboard";

export async function getDashboardData(): Promise<DashboardData> {
  await delay(500);

  return mockDashboardData;
}