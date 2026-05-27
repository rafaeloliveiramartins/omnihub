import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <h1 style={{ marginBottom: 16 }}>Entrar no OmniHub</h1>
        <LoginForm />
      </div>
    </main>
  );
}