package com.flowforge.workflowservice.presentation.dto.response;

import java.util.List;

public record WorkflowDefinitionResponse(
        List<NodeDefinitionResponse> nodes,
        List<EdgeDefinitionResponse> edges
) {
}