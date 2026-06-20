package com.flowforge.workflowservice.presentation.dto;

import jakarta.validation.constraints.NotBlank;

public record UpdateWorkflowRequest(
        @NotBlank
        String name,
        String description
) {}