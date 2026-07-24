"use client";

import { ProfileStat } from "@/types/profile";

import StatCard from "./StatCard";

interface StatsGridProps {
  stats: ProfileStat[];
}

export default function StatsGrid({
  stats,
}: StatsGridProps) {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          stat={stat}
        />
      ))}
    </section>
  );
}