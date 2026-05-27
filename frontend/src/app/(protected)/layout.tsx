import { SessionHydrator } from "@/components/auth/session-hydrator";
import { AppShell } from "@/components/layout/app-shell";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionHydrator>
      <AppShell>{children}</AppShell>
    </SessionHydrator>
  );
}