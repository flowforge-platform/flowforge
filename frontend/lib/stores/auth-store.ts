import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  tokenType: string | null;

  hasHydrated: boolean;

  setTokens: (
    accessToken: string,
    refreshToken: string,
    tokenType: string
  ) => void;

  clearTokens: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      tokenType: null,
      hasHydrated: false,

      setTokens: (accessToken, refreshToken, tokenType) =>
        set({
          accessToken,
          refreshToken,
          tokenType,
        }),

      clearTokens: () =>
        set({
          accessToken: null,
          refreshToken: null,
          tokenType: null,
        }),

      setHasHydrated: (state) =>
        set({
          hasHydrated: state,
        })

    }),
    
    {
      name: "flowforge-auth",

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);