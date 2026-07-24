import {
  Cpu,
  Database,
  HardDrive,
  Server,
} from "lucide-react";

import { MonitoringData } from "@/types/monitoring";

interface Props {
  infrastructure:
    MonitoringData["infrastructure"];
}

export default function InfrastructureHealth({
  infrastructure,
}: Props) {
  return (
    <section className="rounded-xl border bg-card p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Infrastructure Health
        </h2>

        <span className="text-sm text-cyan-400">
          Operational
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {infrastructure.services.map(
          (service) => (
            <div
              key={service.id}
              className="rounded-lg border p-4"
            >
              <p className="text-xs uppercase text-muted-foreground">
                {service.name}
              </p>

              <p className="mt-3 font-medium text-cyan-400">
                Healthy
              </p>
            </div>
          )
        )}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-5 border-t pt-6">
        <Metric
          icon={Cpu}
          label="CPU"
          value={`${infrastructure.metrics.cpuUsage}%`}
        />

        <Metric
          icon={Database}
          label="Memory"
          value={`${infrastructure.metrics.memoryUsage} GB`}
        />

        <Metric
          icon={HardDrive}
          label="Events"
          value={`${infrastructure.metrics.eventRate.toLocaleString()}/s`}
        />
      </div>
    </section>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Server;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-muted-foreground" />

        <span className="text-xs text-muted-foreground">
          {label}
        </span>
      </div>

      <p className="mt-2 text-xl font-semibold">
        {value}
      </p>
    </div>
  );
}