package com.flowforge.auth_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private String tokenType;
    private String message;

    public static AuthResponse of(String access, String refresh, String message) {
        return new AuthResponse(access, refresh, "Bearer", message);
    }
}