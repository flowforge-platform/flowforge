import { getExecution, getExecutionTasks } from "./executions";
import { getWorkflowById } from "./workflow";
import {
  ExecutionDetails,
  ExecutionNodeStatus,
  ExecutionTimelineItem,
  ExecutionLog,
} from "@/types/execution-details";
import { TaskExecutionResponse } from "@/types/execution";

function formatNodeType(nodeType?: string): string {
  if (!nodeType) return "Task";
  const upper = nodeType.toUpperCase();
  if (upper === "START") return "START";
  if (upper === "END") return "END";
  if (upper === "HTTP_REQUEST" || upper === "HTTPREQUEST") return "HTTP Request";
  if (upper === "CONDITION") return "Condition";
  return nodeType
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatStatusName(status?: string): string {
  const s = (status || "").toUpperCase();
  if (s === "PENDING") return "Pending";
  if (s === "RUNNING") return "Running";
  if (s === "COMPLETED" || s === "SUCCESS") return "Success";
  if (s === "FAILED") return "Failed";
  if (s === "WAITING") return "Waiting";
  return status ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() : "Unknown";
}

function extractUrlFromError(errorMessage?: string | null): string | null {
  if (!errorMessage) return null;
  const urlMatch = errorMessage.match(/https?:\/\/[^\s<"']+/i);
  return urlMatch ? urlMatch[0] : null;
}

function formatConciseError(errorMessage?: string | null): string {
  if (!errorMessage) return "Execution failed";

  const statusTextMap: Record<string, string> = {
    "400": "Bad Request",
    "401": "Unauthorized",
    "403": "Forbidden",
    "404": "Not Found",
    "405": "Method Not Allowed",
    "408": "Request Timeout",
    "429": "Too Many Requests",
    "500": "Internal Server Error",
    "502": "Bad Gateway",
    "503": "Service Temporarily Unavailable",
    "504": "Gateway Timeout",
  };

  if (errorMessage.includes("<html") || errorMessage.includes("<!DOCTYPE") || errorMessage.includes("<HTML")) {
    const titleMatch = errorMessage.match(/<title[^>]*>(.*?)<\/title>/i);
    if (titleMatch && titleMatch[1]) {
      const cleanTitle = titleMatch[1].trim();
      const innerCodeMatch = cleanTitle.match(/\b([1-5]\d\d)\b/);
      if (innerCodeMatch && statusTextMap[innerCodeMatch[1]]) {
        return `HTTP ${innerCodeMatch[1]} — ${statusTextMap[innerCodeMatch[1]]}`;
      }
      if (cleanTitle) return cleanTitle;
    }
    const h1Match = errorMessage.match(/<h1[^>]*>(.*?)<\/h1>/i);
    if (h1Match && h1Match[1]) {
      const h1Text = h1Match[1].trim();
      const innerCodeMatch = h1Text.match(/\b([1-5]\d\d)\b/);
      if (innerCodeMatch && statusTextMap[innerCodeMatch[1]]) {
        return `HTTP ${innerCodeMatch[1]} — ${statusTextMap[innerCodeMatch[1]]}`;
      }
      return h1Text;
    }
  }

  const statusMatch = errorMessage.match(/\b(HTTP\s+)?([1-5]\d\d)\b/i);
  if (statusMatch) {
    const code = statusMatch[2];
    if (statusTextMap[code]) {
      return `HTTP ${code} — ${statusTextMap[code]}`;
    }
  }

  const cleanStr = errorMessage.replace(/<[^>]*>?/gm, "").trim();
  const firstLine = cleanStr.split("\n")[0].trim();
  if (firstLine.length > 80) {
    return firstLine.substring(0, 77) + "...";
  }
  return firstLine || "Execution failed";
}

function formatDuration(
  startedAt?: string,
  completedAt?: string | null
): string {
  if (!startedAt) return "00:00";
  const start = new Date(startedAt).getTime();
  const end = completedAt ? new Date(completedAt).getTime() : Date.now();
  const diffSec = Math.max(0, Math.floor((end - start) / 1000));
  const hrs = Math.floor(diffSec / 3600);
  const mins = Math.floor((diffSec % 3600) / 60);
  const secs = diffSec % 60;
  if (hrs > 0) {
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function formatTime(dateStr?: string | null): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleTimeString();
  } catch {
    return dateStr;
  }
}

export async function getExecutionDetails(
  id: string
): Promise<ExecutionDetails | null> {
  try {
    const executionData = await getExecution(id);
    if (!executionData) return null;

    let tasks: TaskExecutionResponse[] = [];
    try {
      const rawTasks = await getExecutionTasks(id);
      if (Array.isArray(rawTasks)) {
        tasks = rawTasks;
      }
    } catch (err) {
      console.warn("Failed to fetch task executions:", err);
    }

    let workflowName = `Workflow (${executionData.workflowId.substring(0, 8)})`;
    if (executionData.workflowId) {
      try {
        const workflow = await getWorkflowById(executionData.workflowId);
        if (workflow?.name) {
          workflowName = workflow.name;
        }
      } catch {
        // Fall back gracefully
      }
    }

    const duration = formatDuration(
      executionData.startedAt,
      executionData.completedAt
    );

    const completedCount = tasks.filter(
      (t) =>
        t.status?.toUpperCase() === "COMPLETED" ||
        t.status?.toUpperCase() === "SUCCESS"
    ).length;
    const activeCount = tasks.filter(
      (t) =>
        t.status?.toUpperCase() === "RUNNING" ||
        t.status?.toUpperCase() === "PENDING"
    ).length;
    const errorCount = tasks.filter(
      (t) => t.status?.toUpperCase() === "FAILED"
    ).length;

    const totalTasks = tasks.length;
    const progress =
      totalTasks > 0
        ? Math.round((completedCount / totalTasks) * 100)
        : executionData.status?.toUpperCase() === "COMPLETED"
        ? 100
        : 0;

    const mapNodeStatus = (status: string): ExecutionNodeStatus => {
      const s = (status || "").toUpperCase();
      if (s === "COMPLETED" || s === "SUCCESS") return "SUCCESS";
      if (s === "RUNNING") return "RUNNING";
      if (s === "FAILED") return "FAILED";
      if (s === "WAITING") return "WAITING";
      if (s === "PENDING") return "PENDING";
      return "IDLE";
    };

    const nodes = tasks.map((t) => ({
      id: t.nodeId,
      status: mapNodeStatus(t.status),
    }));

    interface InternalTimelineItem extends ExecutionTimelineItem {
      sortTime: number;
    }

    const timelineItemsWithTime: InternalTimelineItem[] = [];

    if (executionData.startedAt) {
      timelineItemsWithTime.push({
        id: "start",
        title: "Workflow — Started",
        description: `Execution started for ${workflowName}`,
        timestamp: formatTime(executionData.startedAt),
        status: "SUCCESS",
        sortTime: new Date(executionData.startedAt).getTime(),
      });
    }

    tasks.forEach((t, idx) => {
      const statusUpper = (t.status || "").toUpperCase();
      if (!t.startedAt && statusUpper === "PENDING") {
        return;
      }

      const taskId = t.taskExecutionId || t.id || `task-${idx}`;
      let itemStatus: "SUCCESS" | "WAITING" | "FAILED" | "PENDING" | "RUNNING" = "SUCCESS";
      if (statusUpper === "FAILED") itemStatus = "FAILED";
      else if (statusUpper === "WAITING") itemStatus = "WAITING";
      else if (statusUpper === "PENDING") itemStatus = "PENDING";
      else if (statusUpper === "RUNNING") itemStatus = "RUNNING";
      else if (statusUpper === "COMPLETED" || statusUpper === "SUCCESS") itemStatus = "SUCCESS";

      const nodeTypeName = formatNodeType(t.nodeType);
      const statusName = formatStatusName(t.status);
      const title = `${nodeTypeName} — ${statusName}`;
      const conciseErr = formatConciseError(t.errorMessage);
      const reqUrl = extractUrlFromError(t.errorMessage);

      let description = "Completed successfully";
      if (statusUpper === "FAILED") {
        description = reqUrl ? `${conciseErr} (${reqUrl})` : conciseErr;
      } else if (statusUpper === "RUNNING") {
        description = "Execution in progress";
      } else if (statusUpper === "PENDING") {
        description = "Execution pending";
      } else if (statusUpper === "WAITING") {
        description = "Waiting for approval or input";
      }

      const rawTimeStr = t.completedAt || t.startedAt || executionData.startedAt;
      const sortTime = rawTimeStr ? new Date(rawTimeStr).getTime() : Date.now();

      timelineItemsWithTime.push({
        id: taskId,
        title,
        description,
        timestamp: formatTime(t.completedAt || t.startedAt),
        status: itemStatus,
        errorMessage: t.errorMessage || undefined,
        sortTime,
      });
    });

    if (executionData.completedAt) {
      const isFailed = executionData.status?.toUpperCase() === "FAILED";
      timelineItemsWithTime.push({
        id: "completed",
        title: `Workflow — ${isFailed ? "Failed" : "Completed"}`,
        description: `Workflow execution ${executionData.status.toLowerCase()}`,
        timestamp: formatTime(executionData.completedAt),
        status: isFailed ? "FAILED" : "SUCCESS",
        sortTime: new Date(executionData.completedAt).getTime(),
      });
    }

    timelineItemsWithTime.sort((a, b) => a.sortTime - b.sortTime);

    const timeline: ExecutionTimelineItem[] = timelineItemsWithTime.map(
      ({ sortTime, ...item }) => item
    );

    interface InternalExecutionLog extends ExecutionLog {
      sortTime: number;
    }
    const logItemsWithTime: InternalExecutionLog[] = [];

    if (executionData.startedAt) {
      logItemsWithTime.push({
        id: "log-start",
        timestamp: formatTime(executionData.startedAt),
        level: "SYSTEM",
        message: `Workflow execution started`,
        sortTime: new Date(executionData.startedAt).getTime(),
      });
    }

    tasks.forEach((t, idx) => {
      const taskId = t.taskExecutionId || t.id || `task-${idx}`;
      const nodeTypeName = formatNodeType(t.nodeType);
      const statusUpper = (t.status || "").toUpperCase();
      const conciseErr = formatConciseError(t.errorMessage);

      if (t.startedAt) {
        const logLevel = statusUpper === "WAITING" ? "WAIT" : "INFO";
        const startStatusText = statusUpper === "WAITING" ? "Waiting" : "Running";
        logItemsWithTime.push({
          id: `log-${taskId}-start`,
          timestamp: formatTime(t.startedAt),
          level: logLevel,
          message: `${nodeTypeName} started — ${startStatusText}`,
          sortTime: new Date(t.startedAt).getTime(),
        });
      }

      if (t.completedAt && (statusUpper === "COMPLETED" || statusUpper === "SUCCESS")) {
        logItemsWithTime.push({
          id: `log-${taskId}-complete`,
          timestamp: formatTime(t.completedAt),
          level: "INFO",
          message: `${nodeTypeName} completed — Success`,
          sortTime: new Date(t.completedAt).getTime(),
        });
      }

      if (t.errorMessage || statusUpper === "FAILED") {
        const errorTimeStr = t.completedAt || t.startedAt || executionData.startedAt;
        logItemsWithTime.push({
          id: `log-${taskId}-err`,
          timestamp: formatTime(t.completedAt || t.startedAt),
          level: "ERROR",
          message: `${nodeTypeName} failed — ${conciseErr}`,
          sortTime: errorTimeStr ? new Date(errorTimeStr).getTime() : Date.now(),
        });
      }
    });

    if (executionData.completedAt) {
      const isFailed = executionData.status?.toUpperCase() === "FAILED";
      logItemsWithTime.push({
        id: "log-end",
        timestamp: formatTime(executionData.completedAt),
        level: isFailed ? "ERROR" : "SYSTEM",
        message: `Workflow execution ${executionData.status.toLowerCase()}`,
        sortTime: new Date(executionData.completedAt).getTime(),
      });
    }

    logItemsWithTime.sort((a, b) => a.sortTime - b.sortTime);

    const logs: ExecutionLog[] = logItemsWithTime.map(
      ({ sortTime, ...log }) => log
    );

    let mappedStatus: "RUNNING" | "WAITING" | "FAILED" | "COMPLETED" = "RUNNING";
    const rawStatus = (executionData.status || "").toUpperCase();
    if (rawStatus === "COMPLETED") mappedStatus = "COMPLETED";
    else if (rawStatus === "FAILED") mappedStatus = "FAILED";
    else if (rawStatus === "WAITING") mappedStatus = "WAITING";
    else mappedStatus = "RUNNING";

    return {
      id: executionData.executionId,
      workflowId: executionData.workflowId,
      workflowName,
      duration,
      progress,
      status: mappedStatus,
      stats: {
        success: completedCount,
        active: activeCount,
        error: errorCount,
      },
      infrastructure: {
        worker: "default-worker",
        memory: "N/A",
      },
      nodes,
      timeline,
      logs,
    };
  } catch (err: any) {
    if (err?.response?.status === 404) {
      return null;
    }
    throw err;
  }
}