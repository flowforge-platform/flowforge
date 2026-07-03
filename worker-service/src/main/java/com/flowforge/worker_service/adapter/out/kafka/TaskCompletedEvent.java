package com.flowforge.worker_service.adapter.out.kafka;

import com.flowforge.worker_service.domain.enums.TaskStatus;

import java.time.LocalDateTime;

public record TaskCompletedEvent(
        String workflowExecutionId,
        String taskExecutionId,
        String nodeId,
        String nodeType,
        TaskStatus status,
        boolean success,
        String message,
        LocalDateTime completedAt
) {
}
