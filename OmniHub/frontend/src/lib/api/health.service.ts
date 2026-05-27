import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

export async function getHealth() {
  return apiClient<{ status: string }>(API_ENDPOINTS.health);
}