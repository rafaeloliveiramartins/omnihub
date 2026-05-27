export type LoginRequest = {
  email: string;
  password: string;
  orgId?: string;
};

export type LoginResponse = {
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: number;
  user: {
    id: string;
    fullName: string;
    email: string;
  };
};

export type MeResponse = {
  id: string;
  fullName: string;
  email: string;
};