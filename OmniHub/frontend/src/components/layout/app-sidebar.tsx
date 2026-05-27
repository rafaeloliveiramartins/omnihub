import Link from "next/link";
import { navigationItems } from "@/config/navigation";

export function AppSidebar() {
  return (
    <aside style={{ borderRight: "1px solid #1f2937", padding: 16 }}>
      <h2 style={{ marginBottom: 16 }}>OmniHub</h2>
      <nav style={{ display: "grid", gap: 10 }}>
        {navigationItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}