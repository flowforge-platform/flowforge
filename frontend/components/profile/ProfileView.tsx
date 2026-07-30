"use client";

import { Profile } from "@/types/profile";
import ProfileCard from "./ProfileCard";
import SecurityCard from "./SecurityCard";
import StatsGrid from "./StatsGrid";
import RecentActivity from "./RecentActivity";

interface ProfileViewProps {
  profile: Profile;
}

export default function ProfileView({
  profile,
}: ProfileViewProps) {
  return (
    <main className="space-y-8 p-8">

      {/* Page Header */}
      <section>
        <h1 className="text-4xl font-bold">
          My Profile
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your account and workspace information
        </p>
      </section>

      {/* Top Cards */}
      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">

        <ProfileCard
            user={profile.user} />

        <SecurityCard
            security={profile.security} />

      </section>

      {/* Stats */}
      <StatsGrid
          stats={profile.stats}
        />

      {/* Activity */}
      <RecentActivity
        activities={profile.activities} />

    </main>
  );
}