package com.flowforge.workflowservice.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;

public record UpdateWorkflowRequest(
        @NotBlank(message = "Workflow name is required")
        String name,
        String description
) {}