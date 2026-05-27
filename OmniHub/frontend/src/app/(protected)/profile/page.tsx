"use client";

import { useAuthStore } from "@/stores/auth.store";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const currentOrg = useAuthStore((state) => state.currentOrg);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  if (!isHydrated) {
    return (
      <div style={{ display: "grid", gap: 12 }}>
        <h1 style={{ margin: 0 }}>Meu Perfil</h1>
        <p style={{ margin: 0, color: "#9ca3af" }}>Carregando sessão...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div style={{ display: "grid", gap: 12 }}>
        <h1 style={{ margin: 0 }}>Meu Perfil</h1>
        <p style={{ margin: 0, color: "#9ca3af" }}>
          Não foi possível carregar os dados do usuário.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h1 style={{ margin: 0 }}>Meu Perfil</h1>

      <section
        style={{
          display: "grid",
          gap: 12,
          padding: 16,
          border: "1px solid #1f2937",
          borderRadius: 12,
          background: "#030712",
        }}
      >
        <div>
          <p style={{ margin: "0 0 4px 0", color: "#9ca3af", fontSize: 14 }}>
            Nome
          </p>
          <strong>{user.full_name}</strong>
        </div>

        <div>
          <p style={{ margin: "0 0 4px 0", color: "#9ca3af", fontSize: 14 }}>
            E-mail
          </p>
          <strong>{user.email}</strong>
        </div>

        <div>
          <p style={{ margin: "0 0 4px 0", color: "#9ca3af", fontSize: 14 }}>
            ID do usuário
          </p>
          <strong>{user.id}</strong>
        </div>

        <div>
          <p style={{ margin: "0 0 4px 0", color: "#9ca3af", fontSize: 14 }}>
            Organização atual
          </p>
          <strong>{currentOrg?.trade_name ?? "Não definida"}</strong>
        </div>

        <div>
          <p style={{ margin: "0 0 4px 0", color: "#9ca3af", fontSize: 14 }}>
            ID da organização
          </p>
          <strong>{currentOrg?.id ?? "Não definido"}</strong>
        </div>
      </section>
    </div>
  );
}