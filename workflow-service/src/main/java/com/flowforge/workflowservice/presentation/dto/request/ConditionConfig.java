package com.flowforge.workflowservice.presentation.dto.request;

import com.fasterxml.jackson.databind.JsonNode;
import com.flowforge.workflowservice.application.execution.condtion.ConditionOperator;

public record ConditionConfig(
        String field,
        ConditionOperator operator,
        JsonNode value

) {}