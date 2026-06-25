package com.flowforge.workflowservice.presentation.dto.request;
import jakarta.validation.constraints.NotBlank;

public record CreateWorkflowRequest(

        @NotBlank(message = "Workflow name is required")
        String name,
        String description

) {
}