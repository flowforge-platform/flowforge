import { api } from "./axios";
import { LoginRequest, LoginResponse, RegisterRequest } from "@/types/auth";

export async function login(credentials: LoginRequest) {
  const response = await api.post<LoginResponse>(
    "/api/auth/login",
    credentials
  );

  return response.data;
}

export async function refreshToken(
  refreshToken: string
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    "/api/auth/refresh",
    {
      refreshToken,
    }
  );

  return response.data;
}

export async function registerOrg(data: RegisterRequest) {
  const response = await api.post<LoginResponse>(
    "/api/auth/register/org",
    data
  );

  return response.data;
}