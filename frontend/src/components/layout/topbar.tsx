import { OrgSwitcher } from "@/components/layout/org-switcher";
import { UserMenu } from "@/components/layout/user-menu";

export function Topbar() {
  return (
    <header
      style={{
        height: 64,
        borderBottom: "1px solid #1f2937",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
      }}
    >
      <OrgSwitcher />
      <UserMenu />
    </header>
  );
}