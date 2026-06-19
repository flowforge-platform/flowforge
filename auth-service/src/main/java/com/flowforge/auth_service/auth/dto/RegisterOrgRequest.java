package com.flowforge.auth_service.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterOrgRequest(@NotBlank String organizationName,
                                 @NotBlank String fullName,
                                 @Email  @NotBlank String email,
                                 @NotBlank @Size(min = 8) String password
                                 ) {}
