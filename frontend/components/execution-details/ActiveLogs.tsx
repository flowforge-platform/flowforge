const logLevelConfig = {
  INFO: {
    className: "text-blue-500",
  },
  WAIT: {
    className: "text-amber-500",
  },
  SYSTEM: {
    className: "text-muted-foreground",
  },
  ERROR: {
    className: "text-red-500",
  },
} as const;

interface LogRowProps {
  log: ExecutionLog;
}

function LogRow({
  log,
}: LogRowProps) {
  const config =
    logLevelConfig[log.level];

  return (
    <div className="grid grid-cols-[100px_80px_1fr] gap-4 border-b py-2 font-mono text-sm">

      <span className="text-muted-foreground">
        {log.timestamp}
      </span>

      <span className={config.className}>
        {log.level}
      </span>

      <span>{log.message}</span>

    </div>
  );
}

import type {
  ExecutionDetails,
  ExecutionLog,
} from "@/types/execution-details";

interface ActiveLogsProps {
  execution: ExecutionDetails;
}

export default function ActiveLogs({
  execution,
}: ActiveLogsProps) {
  return (
    <section className="h-64 border-t bg-muted/20">

      <div className="border-b px-5 py-3">

        <h2 className="font-semibold">
          Active Logs
        </h2>

      </div>

      <div className="h-[calc(100%-53px)] overflow-y-auto px-5">

        {execution.logs.map((log) => (
          <LogRow
            key={log.id}
            log={log}
          />
        ))}

      </div>

    </section>
  );
}