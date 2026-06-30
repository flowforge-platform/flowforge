package com.flowforge.auth_service.dto;

import com.flowforge.auth_service.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateInvitationRequest {
    @Email @NotBlank
    private String email;
    @NotNull
    private Role role;
}
