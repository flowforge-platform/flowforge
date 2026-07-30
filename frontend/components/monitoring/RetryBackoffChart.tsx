"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { RetryBackoffPoint } from "@/types/monitoring";

interface RetryBackoffChartProps {
  data: RetryBackoffPoint[];
}

export default function RetryBackoffChart({
  data,
}: RetryBackoffChartProps) {
  return (
    <section className="rounded-xl border bg-card p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">
          Retry Backoff
        </h2>

        <p className="text-sm text-muted-foreground">
          Distribution of retry attempts
        </p>
      </div>

      <div className="h-[220px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#262626"
            />

            <XAxis
              dataKey="attempt"
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
              }}
            />

            <Bar
              dataKey="count"
              radius={[4, 4, 0, 0]}
              fill="#7C6EF6"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}