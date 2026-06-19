package com.flowforge.auth_service.invitation.dto;

import com.flowforge.auth_service.common.enums.Role;

public record InvitationInfoResponse(
    String organizationName,
    String email,
    Role role
) {}