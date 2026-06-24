package com.flowforge.workflowservice.presentation.dto.request;

import com.flowforge.workflowservice.domain.node.NodeType;

import java.util.Map;

public record NodeDefinitionRequest(
        String clientId,
        String nodeKey,
        NodeType nodeType,
        Double positionX,
        Double positionY,
        Map<String, Object> configuration
) {
}
