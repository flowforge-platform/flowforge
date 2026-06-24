package com.flowforge.workflowservice.presentation.dto.response;

import com.flowforge.workflowservice.domain.execution.WorkflowExecutionStatus;

import java.util.UUID;

public record StartExecutionResponse(
        UUID workflowId,
        WorkflowExecutionStatus status
) {}