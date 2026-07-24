"use client";

import {
  KeyRound,
  Laptop,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { SecurityInfo } from "@/types/profile";

interface SecurityCardProps {
  security: SecurityInfo;
}

export default function SecurityCard({
  security,
}: SecurityCardProps) {
  return (
    <section className="rounded-xl border bg-card p-6">

      <div className="mb-6 flex items-center gap-2">
        <ShieldCheck className="size-5 text-primary" />

        <h2 className="text-lg font-semibold">
          Security
        </h2>
      </div>

      <div className="space-y-5">

        <div>
          <p className="text-sm text-muted-foreground">
            Last Login
          </p>

          <p className="mt-1 font-medium">
            {security.lastLogin}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Location
          </p>

          <p className="mt-1 font-medium">
            {security.location}
          </p>
        </div>

      </div>

      <div className="mt-8 space-y-3">

        <Button
          variant="outline"
          className="w-full justify-start"
        >
          <KeyRound className="mr-2 size-4" />
          Change Password
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start"
        >
          <Laptop className="mr-2 size-4" />
          Active Sessions
        </Button>

        <Button
          variant="destructive"
          className="w-full justify-start"
        >
          <LogOut className="mr-2 size-4" />
          Logout Everywhere
        </Button>

      </div>

    </section>
  );
}