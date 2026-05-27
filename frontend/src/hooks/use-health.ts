"use client";

import { useQuery } from "@tanstack/react-query";
import { getHealth } from "@/lib/api/health.service";
import { QUERY_KEYS } from "@/lib/constants/query-keys";

export function useHealth() {
  return useQuery({
    queryKey: QUERY_KEYS.health,
    queryFn: getHealth,
  });
}