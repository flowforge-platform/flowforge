package com.flowforge.auth_service.auth.controller;

import com.flowforge.auth_service.auth.dto.AuthResponse;
import com.flowforge.auth_service.auth.dto.LoginRequest;
import com.flowforge.auth_service.auth.dto.RefreshTokenRequest;
import com.flowforge.auth_service.auth.dto.RegisterOrgRequest;
import com.flowforge.auth_service.auth.dto.RegisterWithInviteRequest;
import com.flowforge.auth_service.auth.facade.AuthFacade;
import com.flowforge.auth_service.common.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthFacade authFacade;

    @PostMapping("/register/org")
    public ApiResponse<AuthResponse> registerOrganization(@Valid @RequestBody RegisterOrgRequest request){
        return ApiResponse.success(authFacade.registerOrganization(request), "Organization created successfully");
    }

    @PostMapping("/register/invite")
    public ApiResponse<AuthResponse> registerWithInvite(@Valid @RequestBody RegisterWithInviteRequest request){
        return ApiResponse.success(authFacade.registerWithInvite(request), "Registration completed successfully");
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(@Valid @RequestBody LoginRequest request){
        return ApiResponse.success(authFacade.login(request), "Login successful");
    }

    @PostMapping("/refresh")
    public ApiResponse<AuthResponse> refresh(@Valid @RequestBody RefreshTokenRequest request){
        return ApiResponse.success(authFacade.refreshToken(request), "Token refreshed successfully");
    }
}
