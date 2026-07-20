package com.flowforge.worker_service.adapter.out.kafka;


import com.flowforge.worker_service.domain.enums.TaskStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public record TaskFailedEvent(
        UUID workflowExecutionId,
        UUID taskExecutionId,
        UUID nodeId,
        String nodeType,
        TaskStatus status,
        String message,
        LocalDateTime completedAt
) {
}
