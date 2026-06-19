package com.flowforge.auth_service.auth.dto;

public record AuthResponse(
    String accessToken,
    String refreshToken,
    String tokenType,
    String message
) {
    public static AuthResponse of(String access, String refresh, String message) {
        return new AuthResponse(access, refresh, "Bearer", message);
    }
}