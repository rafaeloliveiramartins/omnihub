"use client";

import { useAuthStore } from "@/stores/auth.store";

function clearBrowserSession() {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.removeItem("omnihub_access_token");
  sessionStorage.removeItem("omnihub_refresh_token");
  sessionStorage.removeItem("omnihub_org_id");
  sessionStorage.removeItem("omnihub_org_trade_name");
  sessionStorage.removeItem("omnihub_user");

  document.cookie =
    "omnihub_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
}

export function logout() {
  clearBrowserSession();
  useAuthStore.getState().clearSession();
}

export function logoutAndRedirect() {
  logout();

  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}