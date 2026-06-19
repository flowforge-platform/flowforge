package com.flowforge.auth_service.auth.dto;

import com.flowforge.auth_service.common.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateInvitationRequest(
        @Email @NotBlank String email,
        @NotNull Role role
) {}
