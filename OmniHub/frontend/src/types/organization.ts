export type Organization = {
  id: string;
  tradeName: string;
  legalName: string;
  orgType: "HOLDING" | "SUBSIDIARY" | "BUSINESS_UNIT" | "BRANCH";
  status: "ACTIVE" | "INACTIVE";
  parentId: string | null;
};