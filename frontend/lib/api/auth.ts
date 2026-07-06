import { api } from "./axios";
import { LoginRequest, LoginResponse } from "@/types/auth";

export async function login(credentials: LoginRequest) {
  const response = await api.post<LoginResponse>(
    "/api/auth/login",
    credentials
  );

  return response.data;
}
