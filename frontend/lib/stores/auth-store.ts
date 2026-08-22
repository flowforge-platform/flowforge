import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  tokenType: string | null;
  orgId: string | null;

  hasHydrated: boolean;

  setTokens: (
    accessToken: string,
    refreshToken: string,
    tokenType: string
  ) => void;

  clearTokens: () => void;
  setHasHydrated: (state: boolean) => void;
}

function parseJwtPayload(token: string): Record<string, any> | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    let base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4 !== 0) {
      base64 += "=";
    }
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      tokenType: null,
      orgId: null,
      hasHydrated: false,

      setTokens: (accessToken, refreshToken, tokenType) => {
        const payload = parseJwtPayload(accessToken);

        set({
          accessToken,
          refreshToken,
          tokenType,
          orgId: payload?.orgId ?? null,
        });
      },

      clearTokens: () =>
        set({
          accessToken: null,
          refreshToken: null,
          tokenType: null,
          orgId: null,
        }),

      setHasHydrated: (state) =>
        set({
          hasHydrated: state,
        }),
    }),

    {
      name: "flowforge-auth",

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);