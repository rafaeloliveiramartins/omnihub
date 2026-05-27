import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type { Organization } from "@/types/organization";

export async function getOrganizations() {
  return apiClient<Organization[]>(API_ENDPOINTS.orgs.list);
}

export async function getOrganizationTree() {
  return apiClient<Organization[]>(API_ENDPOINTS.orgs.tree);
}