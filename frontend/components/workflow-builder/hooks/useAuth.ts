"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";

export function useAuth() {
  
  const router = useRouter();

  const {
    accessToken,
    refreshToken,
    tokenType,
    setTokens,
    clearTokens,
  } = useAuthStore();

  const logout = () => {
    clearTokens();
    router.replace("/login");
  };

  return {
    accessToken,
    refreshToken,
    tokenType,
    setTokens,
    logout,
  };
}