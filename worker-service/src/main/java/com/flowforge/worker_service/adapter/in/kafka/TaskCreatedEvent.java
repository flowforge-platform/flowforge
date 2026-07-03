package com.flowforge.worker_service.adapter.in.kafka;

import com.fasterxml.jackson.databind.JsonNode;

import java.util.UUID;

public record TaskCreatedEvent(
        UUID workflowExecutionId,
        UUID taskExecutionId,
        UUID nodeId,
        String nodeType,
        JsonNode configuration
) {
}
