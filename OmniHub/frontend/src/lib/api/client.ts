import { env } from "@/config/env";

type RequestOptions = RequestInit & {
  bodyJson?: unknown;
};

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    body: options.bodyJson ? JSON.stringify(options.bodyJson) : options.body,
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(
      data?.detail ?? data?.message ?? "Erro na comunicação com a API.",
    );
  }

  return response.json();
}