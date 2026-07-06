package com.flowforge.worker_service.adapter.out.kafka;

import com.flowforge.worker_service.domain.enums.TaskStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public record TaskCompletedEvent(
        UUID workflowExecutionId,
        UUID taskExecutionId,
        UUID nodeId,
        String nodeType,
        TaskStatus status,
        boolean success,
        String message,
        LocalDateTime completedAt
) {
}
