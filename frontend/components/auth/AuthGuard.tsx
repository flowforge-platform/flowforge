"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({
  children,
}: AuthGuardProps) {

  const router = useRouter();

  const accessToken = useAuthStore(
    state => state.accessToken
  );

  const hasHydrated = useAuthStore(
    state => state.hasHydrated
  );

  useEffect(() => {

    if(!hasHydrated) return;

    if (!accessToken) {
      router.replace("/login");
    }

  }, [hasHydrated, accessToken, router]);

  if(!hasHydrated) {
    return null;
  }

  if (!accessToken) {
    return null;
  }

  return children;
}