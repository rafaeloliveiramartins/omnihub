import { create } from "zustand";

type User = {
  id: string;
  full_name: string;
  email: string;
};

type CurrentOrg = {
  id: string;
  trade_name: string;
};

type SessionPayload = {
  accessToken: string;
  refreshToken?: string | null;
  user: User;
  currentOrg?: CurrentOrg | null;
  permissions?: string[];
  roles?: string[];
  entitlements?: string[];
};

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  user: User | null;
  currentOrg: CurrentOrg | null;
  permissions: string[];
  roles: string[];
  entitlements: string[];
  setSession: (payload: SessionPayload) => void;
  finishHydration: () => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isHydrated: false,
  user: null,
  currentOrg: null,
  permissions: [],
  roles: [],
  entitlements: [],

  setSession: ({
    accessToken,
    refreshToken = null,
    user,
    currentOrg = null,
    permissions = [],
    roles = [],
    entitlements = [],
  }) =>
    set({
      accessToken,
      refreshToken,
      user,
      currentOrg,
      permissions,
      roles,
      entitlements,
      isAuthenticated: true,
      isHydrated: true,
    }),

  finishHydration: () =>
    set({
      isHydrated: true,
    }),

  clearSession: () =>
    set({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isHydrated: true,
      user: null,
      currentOrg: null,
      permissions: [],
      roles: [],
      entitlements: [],
    }),
}));