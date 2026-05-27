"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";

type StoredUser = {
  id: string;
  full_name: string;
  email: string;
};

export function useSessionSync() {
  const setSession = useAuthStore((state) => state.setSession);
  const clearSession = useAuthStore((state) => state.clearSession);
  const finishHydration = useAuthStore((state) => state.finishHydration);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const accessToken = sessionStorage.getItem("omnihub_access_token");
    const refreshToken = sessionStorage.getItem("omnihub_refresh_token");
    const orgId = sessionStorage.getItem("omnihub_org_id");
    const orgTradeName = sessionStorage.getItem("omnihub_org_trade_name");
    const rawUser = sessionStorage.getItem("omnihub_user");

    if (!accessToken || !rawUser) {
      clearSession();
      document.cookie =
        "omnihub_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
      finishHydration();
      return;
    }

    try {
      const user = JSON.parse(rawUser) as StoredUser;

      setSession({
        accessToken,
        refreshToken,
        user,
        currentOrg:
          orgId && orgTradeName
            ? {
                id: orgId,
                trade_name: orgTradeName,
              }
            : null,
        permissions: [],
        roles: [],
        entitlements: [],
      });
    } catch {
      sessionStorage.removeItem("omnihub_access_token");
      sessionStorage.removeItem("omnihub_refresh_token");
      sessionStorage.removeItem("omnihub_org_id");
      sessionStorage.removeItem("omnihub_org_trade_name");
      sessionStorage.removeItem("omnihub_user");

      clearSession();

      document.cookie =
        "omnihub_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    } finally {
      finishHydration();
    }
  }, [setSession, clearSession, finishHydration]);

  return { isHydrated };
}