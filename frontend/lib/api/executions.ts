import { mockExecutionsData } from "@/mocks/executions";
import { delay } from "@/mocks/delay";
import { ExecutionsData } from "@/types/execution";

export async function getExecutionsData(): Promise<ExecutionsData> {
  // await delay(700)
  return mockExecutionsData;
}