package com.flowforge.workflowservice.presentation.dto;

public record EdgeDefinitionRequest(
        String sourceClientId,
        String targetClientId
) {
}