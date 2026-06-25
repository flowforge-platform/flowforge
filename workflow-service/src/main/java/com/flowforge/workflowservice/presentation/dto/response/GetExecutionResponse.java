package com.flowforge.workflowservice.presentation.dto.response;

import com.flowforge.workflowservice.domain.execution.WorkflowExecutionStatus;

import java.time.Instant;
import java.util.UUID;

public record GetExecutionResponse(
        UUID executionId,
        UUID workflowId,
        WorkflowExecutionStatus status,
        Instant startedAt,
        Instant completedAt
) {
}
