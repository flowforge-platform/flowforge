package com.flowforge.workflowservice.presentation.dto.request;

import java.util.UUID;

public record StartExecutionRequest(
        UUID workflowId
) {}
