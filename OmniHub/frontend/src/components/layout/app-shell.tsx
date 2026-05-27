import { AppSidebar } from "@/components/layout/app-sidebar";
import { Topbar } from "@/components/layout/topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", minHeight: "100vh" }}>
      <AppSidebar />
      <div>
        <Topbar />
        <main style={{ padding: 24 }}>{children}</main>
      </div>
    </div>
  );
}