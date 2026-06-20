package com.flowforge.workflowservice.presentation.dto;
import jakarta.validation.constraints.NotBlank;

public record CreateWorkflowRequest(

        @NotBlank
        String name,
        String description

) {
}