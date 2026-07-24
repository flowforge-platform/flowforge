export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthData {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: Record<string, string> | null;
  timestamp: string;
}

export interface RegisterRequest {
  organizationName: string;
  fullName: string;
  email: string;
  password: string;
}

export type LoginResponse = ApiResponse<AuthData>;