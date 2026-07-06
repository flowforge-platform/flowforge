package com.flowforge.workflowservice.application.execution.event;

import com.flowforge.workflowservice.domain.execution.TaskExecutionStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public record TaskCompletedEvent(
        UUID workflowExecutionId,
        UUID taskExecutionId,
        UUID nodeId,
        String nodeType,
        TaskExecutionStatus status,
        boolean success,
        String message,
        LocalDateTime completedAt
) {
}
