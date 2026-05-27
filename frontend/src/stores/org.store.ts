import { create } from "zustand";

type OrgState = {
  currentOrgId: string | null;
  setCurrentOrgId: (orgId: string | null) => void;
};

export const useOrgStore = create<OrgState>((set) => ({
  currentOrgId: null,
  setCurrentOrgId: (orgId) => set({ currentOrgId: orgId }),
}));