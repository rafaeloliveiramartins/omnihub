import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/providers/app-provider";
import { SessionHydrator } from "@/components/auth/session-hydrator";

export const metadata: Metadata = {
  title: "OmniHub",
  description: "Plataforma modular OmniHub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <AppProvider>
          <SessionHydrator>{children}</SessionHydrator>
        </AppProvider>
      </body>
    </html>
  );
}