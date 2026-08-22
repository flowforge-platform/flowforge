"use client";

import type {
  ExecutionDetails,
  ExecutionLog,
} from "@/types/execution-details";

const logLevelConfig = {
  INFO: {
    className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  WAIT: {
    className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  SYSTEM: {
    className: "bg-zinc-800/60 text-zinc-400 border-zinc-700/40",
  },
  ERROR: {
    className: "bg-red-500/10 text-red-400 border-red-500/20",
  },
} as const;

interface LogRowProps {
  log: ExecutionLog;
}

function LogRow({ log }: LogRowProps) {
  const config =
    logLevelConfig[log.level] || logLevelConfig.SYSTEM;

  return (
    <div className="grid grid-cols-[110px_90px_1fr] gap-4 border-b border-border/40 py-2.5 px-2 hover:bg-muted/20 transition-colors font-mono text-xs items-center">
      <span className="text-muted-foreground whitespace-nowrap">
        {log.timestamp}
      </span>

      <div>
        <span
          className={`inline-block rounded border px-2 py-0.5 text-[10px] font-semibold tracking-wider ${config.className}`}
        >
          {log.level}
        </span>
      </div>

      <span className="text-foreground/90 break-words leading-normal">
        {log.message}
      </span>
    </div>
  );
}

interface ActiveLogsProps {
  execution: ExecutionDetails;
}

export default function ActiveLogs({ execution }: ActiveLogsProps) {
  return (
    <section className="h-64 border-t bg-muted/10 flex flex-col">
      <div className="border-b px-5 py-3 bg-muted/20">
        <h2 className="text-sm font-semibold text-foreground">
          Execution Logs
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-1">
        {execution.logs.length === 0 ? (
          <p className="p-4 text-xs text-muted-foreground italic">
            No execution logs available.
          </p>
        ) : (
          execution.logs.map((log) => (
            <LogRow key={log.id} log={log} />
          ))
        )}
      </div>
    </section>
  );
}