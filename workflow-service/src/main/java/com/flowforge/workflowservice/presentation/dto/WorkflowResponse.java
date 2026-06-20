package com.flowforge.workflowservice.presentation.dto;

import java.time.Instant;
import java.util.UUID;

public record WorkflowResponse(

        UUID id,
        UUID organizationId,
        UUID createdBy,
        String name,
        String description,
        String status,
        Instant createdAt,
        Instant updatedAt
) {
}