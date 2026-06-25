package com.flowforge.workflowservice.presentation.dto.request;

import java.util.List;

public record SaveWorkflowDefinitionRequest(
        List<NodeDefinitionRequest> nodes,
        List<EdgeDefinitionRequest> edges
) {
}
