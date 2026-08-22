import { getWorkflows } from "./workflow";
import { getExecutionsData, getExecutionTasks } from "./executions";
import { Activity, DashboardData, RunningExecution } from "@/types/dashboard";

function formatNodeType(nodeType?: string): string {
  if (!nodeType) return "Processing";
  const upper = nodeType.toUpperCase();
  if (upper === "START") return "Start Node";
  if (upper === "END") return "End Node";
  if (upper === "HTTP_REQUEST" || upper === "HTTPREQUEST") return "HTTP Request";
  if (upper === "CONDITION") return "Condition";
  return nodeType
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function getDashboardData(): Promise<DashboardData> {
  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
  const twentyFourHoursAgo = now - 24 * 60 * 60 * 1000;
  const fortyEightHoursAgo = now - 48 * 60 * 60 * 1000;

  const [workflowsResult, executionsResult] = await Promise.allSettled([
    getWorkflows(),
    getExecutionsData(),
  ]);

  const workflows =
    workflowsResult.status === "fulfilled" && Array.isArray(workflowsResult.value)
      ? workflowsResult.value
      : [];

  const executions =
    executionsResult.status === "fulfilled" && Array.isArray(executionsResult.value)
      ? executionsResult.value
      : [];

  const totalWorkflows = workflows.length;
  const createdThisWeek = workflows.filter((w) => {
    if (!w.createdAt) return false;
    return new Date(w.createdAt).getTime() >= sevenDaysAgo;
  }).length;

  const totalExecutions = executions.length;
  const runningExecutionsList = executions.filter(
    (e) => e.status === "RUNNING" || e.status === "PENDING" || e.status === "WAITING"
  );
  const runningExecutionsCount = runningExecutionsList.length;

  const completedExecutionsCount = executions.filter(
    (e) => e.status === "COMPLETED"
  ).length;

  const failedExecutions = executions.filter((e) => e.status === "FAILED");

  const finishedExecutionsCount = completedExecutionsCount + failedExecutions.length;
  const successRate =
    finishedExecutionsCount > 0
      ? Number(((completedExecutionsCount / finishedExecutionsCount) * 100).toFixed(1))
      : 100;

  const failedExecutions24h = failedExecutions.filter((e) => {
    if (!e.startedAt) return false;
    return new Date(e.startedAt).getTime() >= twentyFourHoursAgo;
  }).length;

  const prev24hFailures = failedExecutions.filter((e) => {
    if (!e.startedAt) return false;
    const time = new Date(e.startedAt).getTime();
    return time >= fortyEightHoursAgo && time < twentyFourHoursAgo;
  }).length;

  const failureChange = failedExecutions24h - prev24hFailures;

  const runningExecutionsData: RunningExecution[] = await Promise.all(
    runningExecutionsList.slice(0, 10).map(async (exec) => {
      let progress = exec.status === "RUNNING" ? 50 : 0;
      let currentStep = exec.status === "RUNNING" ? "Execution In Progress" : "Pending Queue";

      try {
        const tasks = await getExecutionTasks(exec.id);
        if (Array.isArray(tasks) && tasks.length > 0) {
          const totalTasks = tasks.length;
          const completedTasks = tasks.filter(
            (t: any) =>
              t.status?.toUpperCase() === "COMPLETED" ||
              t.status?.toUpperCase() === "SUCCESS"
          ).length;

          progress = Math.round((completedTasks / totalTasks) * 100);

          const activeTask =
            tasks.find(
              (t: any) =>
                t.status?.toUpperCase() === "RUNNING" ||
                t.status?.toUpperCase() === "WAITING"
            ) ||
            tasks.find((t: any) => t.status?.toUpperCase() === "PENDING") ||
            tasks[tasks.length - 1];

          if (activeTask) {
            currentStep = formatNodeType(activeTask.nodeType);
          }
        }
      } catch (err) {
        console.warn(`Failed to fetch tasks for active execution ${exec.id}:`, err);
      }

      return {
        id: exec.id,
        workflowName: exec.workflow.name,
        currentStep,
        progress,
        status: exec.status === "WAITING" ? "WAITING" : "RUNNING",
        startedAt: exec.startedAt || new Date().toISOString(),
      };
    })
  );

  const activities: Activity[] = [];
  executions.forEach((e) => {
    if (e.startedAt) {
      activities.push({
        id: `start-${e.id}`,
        type: "EXECUTION_STARTED",
        message: `Execution Started: '${e.workflow.name}'`,
        createdAt: e.startedAt,
      });
    }

    if (e.completedAt) {
      if (e.status === "FAILED") {
        activities.push({
          id: `fail-${e.id}`,
          type: "EXECUTION_FAILED",
          message: `Execution Failed: '${e.workflow.name}'`,
          createdAt: e.completedAt,
        });
      } else if (e.status === "COMPLETED") {
        const durationText = e.duration ? ` in ${e.duration}s` : "";
        activities.push({
          id: `complete-${e.id}`,
          type: "EXECUTION_COMPLETED",
          message: `Execution Completed: '${e.workflow.name}'${durationText}`,
          createdAt: e.completedAt,
        });
      }
    }
  });

  activities.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const completedWithDuration = executions.filter(
    (e) => e.status === "COMPLETED" && typeof e.duration === "number" && e.duration >= 0
  );

  const avgDuration =
    completedWithDuration.length > 0
      ? Number(
          (
            completedWithDuration.reduce((acc, curr) => acc + (curr.duration || 0), 0) /
            completedWithDuration.length
          ).toFixed(1)
        )
      : 0;

  const failureRate = Number((100 - successRate).toFixed(1));

  return {
    stats: {
      totalWorkflows,
      createdThisWeek,
      runningExecutions: runningExecutionsCount,
      completedExecutions: completedExecutionsCount,
      successRate,
      failedExecutions24h,
      failureChange,
      totalExecutions,
    },
    runningExecutions: runningExecutionsData,
    activities: activities.slice(0, 10),
    systemHealth: {
      successRate,
      failureRate,
      activeInstances: runningExecutionsCount,
      averageExecutionTime: avgDuration,
    },
  };
}
