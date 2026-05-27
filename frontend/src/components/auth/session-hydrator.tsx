// src/components/auth/session-hydrator.tsx
"use client";

import { ReactNode } from "react";
import { useSessionSync } from "@/hooks/use-session-sync";

type SessionHydratorProps = {
  children: ReactNode;
};

export function SessionHydrator({ children }: SessionHydratorProps) {
  const { isHydrated } = useSessionSync();

  if (!isHydrated) {
    return null;
  }

  return <>{children}</>;
}