"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";

export default function GuestGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const accessToken = useAuthStore(
    state => state.accessToken
  );

  const hasHydrated = useAuthStore(
    state => state.hasHydrated
  );

  useEffect(() => {
    if (!hasHydrated) return;

    if (accessToken) {
      router.replace("/dashboard");
    }
  }, [accessToken, hasHydrated, router]);

  if (!hasHydrated) return null;

  if (accessToken) return null;

  return children;
}