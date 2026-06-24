package com.flowforge.workflowservice.presentation.dto.request;

public record EdgeDefinitionRequest(
        String sourceClientId,
        String targetClientId
) {
}