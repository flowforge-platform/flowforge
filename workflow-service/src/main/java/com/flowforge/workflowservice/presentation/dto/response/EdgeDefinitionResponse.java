package com.flowforge.workflowservice.presentation.dto.response;

import java.util.UUID;

public record EdgeDefinitionResponse(
        UUID sourceNodeId,
        UUID targetNodeId
) {
}