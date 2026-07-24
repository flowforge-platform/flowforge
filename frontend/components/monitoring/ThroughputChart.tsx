"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ThroughputPoint } from "@/types/monitoring";

interface ThroughputChartProps {
  data: ThroughputPoint[];
}

function LegendItem({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`size-2 rounded-full ${color}`}
      />

      <span className="text-xs text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export default function ThroughputChart({
  data,
}: ThroughputChartProps) {
  return (
    
    <section className="rounded-xl border bg-card p-5">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Workflow Throughput
          </h2>

          <p className="text-sm text-muted-foreground">
            Started, completed and failed executions
          </p>
        </div>

        <div className="flex items-center gap-5 text-xs">
          <LegendItem
            color="bg-sky-400"
            label="Started"
          />

          <LegendItem
            color="bg-violet-400"
            label="Completed"
          />

          <LegendItem
            color="bg-red-400"
            label="Failed"
          />
        </div>
        
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="completed"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#7C6EF6"
                  stopOpacity={0.45}
                />

                <stop
                  offset="95%"
                  stopColor="#7C6EF6"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#262626"
            />

            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#8A8A8F",
                fontSize: 12,
              }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#8A8A8F",
                fontSize: 12,
              }}
            />

            <Tooltip
              contentStyle={{
                background: "#17171A",
                border: "1px solid #2A2A2D",
                borderRadius: "10px",
                color: "#fff",
              }}
            />

            <Area
              type="monotone"
              dataKey="completed"
              stroke="#7C6EF6"
              fill="url(#completed)"
              strokeWidth={2}
            />

            <Area
              type="monotone"
              dataKey="started"
              stroke="#4FD1FF"
              fill="transparent"
              strokeWidth={2}
            />

            <Area
              type="monotone"
              dataKey="failed"
              stroke="#F87171"
              fill="transparent"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}