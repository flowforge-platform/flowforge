"use client";

import Image from "next/image";

import { Pencil } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { UserProfile } from "@/types/profile";

interface ProfileCardProps {
  user: UserProfile;
}

export default function ProfileCard({
  user,
}: ProfileCardProps) {
  return (
    <section className="rounded-xl border bg-card p-8">

      {/* Header */}

      <div className="flex gap-6">

        {/* Avatar */}

        <div className="relative">

          <img
            src={user.avatar}
            alt={user.name}
            width={120}
            height={120}
            className="rounded-xl object-cover"
          />

          <Button
            size="icon"
            className="absolute -bottom-2 -right-2 rounded-full"
          >
            <Pencil className="size-4" />
          </Button>

        </div>

        {/* User */}

        <div className="flex-1">

          <div className="flex items-start justify-between">

            <div>

              <h2 className="text-3xl font-bold">
                {user.name}
              </h2>

              <p className="mt-1 text-muted-foreground">
                {user.email}
              </p>

            </div>

            <div className="flex gap-2">

              {user.badges.map((badge) => (
                <Badge
                  key={badge.label}
                  variant={badge.variant}
                >
                  {badge.label}
                </Badge>
              ))}

            </div>

          </div>

          <div className="mt-8 grid grid-cols-3 gap-8">

            <ProfileInfo
              label="Role"
              value={user.role}
            />

            <ProfileInfo
              label="Organization"
              value={user.organization}
            />

            <ProfileInfo
              label="Member Since"
              value={user.memberSince}
            />

          </div>

        </div>

      </div>

    </section>
  );
}

interface ProfileInfoProps {
  label: string;
  value: string;
}

function ProfileInfo({
  label,
  value,
}: ProfileInfoProps) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>

      <p className="mt-2 font-semibold">
        {value}
      </p>
    </div>
  );
}