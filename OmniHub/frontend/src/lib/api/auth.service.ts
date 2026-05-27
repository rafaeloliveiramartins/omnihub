import { apiClient } from "@/lib/api/client";

export type LoginRequest = {
  email: string;
  password: string;
  org_trade_name: string;
};

type ApiResponse<T> = {
  data: T;
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  token_type?: string;
  expires_in: number;
  user: {
    id: string;
    full_name: string;
    email: string;
  };
  org: {
    id: string;
    trade_name: string;
  };
};

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient<ApiResponse<LoginResponse>>("/auth/login", {
    method: "POST",
    bodyJson: payload,
  });

  return response.data;
}