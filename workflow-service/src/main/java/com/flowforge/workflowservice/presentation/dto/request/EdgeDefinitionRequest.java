package com.flowforge.workflowservice.presentation.dto.request;

import com.flowforge.workflowservice.domain.edge.BranchType;

public record EdgeDefinitionRequest(
        String sourceClientId,
        String targetClientId,
        BranchType branchType
) {
}