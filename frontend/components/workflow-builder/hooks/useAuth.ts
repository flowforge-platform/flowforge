"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";

export function useAuth() {
  const router = useRouter();

  const {
    accessToken,
    refreshToken,
    tokenType,
    orgId,
    setTokens,
    clearTokens,
  } = useAuthStore();

  const logout = () => {
    clearTokens();
    router.replace("/login");
  };

  const isAuthenticated = Boolean(accessToken);

  return {
    accessToken,
    refreshToken,
    tokenType,
    orgId,
    setTokens,
    logout,
    isAuthenticated,
  };
}