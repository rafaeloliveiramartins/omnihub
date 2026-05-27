"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth.service";
import { useAuthStore } from "@/stores/auth.store";

export function LoginForm() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgTradeName, setOrgTradeName] = useState("OmniHub");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const data = await login({
        email: email.trim().toLowerCase(),
        password,
        org_trade_name: orgTradeName.trim(),
      });

      if (!data?.access_token) {
        throw new Error("Resposta de login sem access_token.");
      }

      if (!data?.user?.id) {
        throw new Error("Resposta de login sem user.id.");
      }

      if (!data?.org?.id) {
        throw new Error("Resposta de login sem org.id.");
      }

      setSession({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        user: data.user,
        currentOrg: data.org,
        permissions: [],
        roles: [],
        entitlements: [],
      });

      if (typeof window !== "undefined") {
        sessionStorage.setItem("omnihub_access_token", data.access_token);
        sessionStorage.setItem("omnihub_refresh_token", data.refresh_token);
        sessionStorage.setItem("omnihub_org_id", data.org.id);
        sessionStorage.setItem("omnihub_org_trade_name", data.org.trade_name);
        sessionStorage.setItem("omnihub_user", JSON.stringify(data.user));

        document.cookie = "omnihub_session=1; path=/; SameSite=Lax";
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Não foi possível fazer login.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: 12, borderRadius: 8, border: "1px solid #374151" }}
      />

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: 12, borderRadius: 8, border: "1px solid #374151" }}
      />

      <input
        type="text"
        placeholder="Organização"
        value={orgTradeName}
        onChange={(e) => setOrgTradeName(e.target.value)}
        style={{ padding: 12, borderRadius: 8, border: "1px solid #374151" }}
      />

      {error ? (
        <p style={{ color: "#f87171", margin: 0 }}>{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          padding: 12,
          borderRadius: 8,
          border: 0,
          cursor: "pointer",
          opacity: isSubmitting ? 0.7 : 1,
        }}
      >
        {isSubmitting ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}