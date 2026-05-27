export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
    me: "/auth/me",
    sessions: "/auth/sessions",
  },
  orgs: {
    list: "/orgs",
    tree: "/orgs/tree",
    details: (id: string) => `/orgs/${id}`,
  },
  subscriptions: {
    active: "/subscriptions/active",
  },
  connectors: {
    list: "/connectors",
  },
  analytics: {
    kpis: "/analytics/kpis",
  },
  health: "/health",
};