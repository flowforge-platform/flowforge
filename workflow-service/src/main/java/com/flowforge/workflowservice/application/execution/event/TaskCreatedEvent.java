package com.flowforge.workflowservice.application.execution.event;

import java.util.UUID;

public record TaskCreatedEvent(
        UUID workflowExecutionId,
        UUID taskExecutionId,
        UUID nodeId,
        String nodeType
) {
}