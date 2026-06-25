package com.flowforge.workflowservice.presentation.dto.response;

import com.flowforge.workflowservice.domain.execution.TaskExecutionStatus;

import java.time.Instant;
import java.util.UUID;

public record TaskExecutionResponse(
        UUID taskExecutionId,
        UUID nodeId,
        String nodeType,
        TaskExecutionStatus status,
        Instant startedAt,
        Instant completedAt,
        String errorMessage
) {
}
