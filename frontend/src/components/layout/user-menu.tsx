"use client";

import { logoutAndRedirect } from "@/lib/auth/logout";

export function UserMenu() {
  return (
    <button
      type="button"
      onClick={logoutAndRedirect}
      style={{
        padding: "8px 12px",
        borderRadius: 8,
        border: "1px solid #374151",
        background: "transparent",
        color: "white",
        cursor: "pointer",
      }}
    >
      Sair
    </button>
  );
}