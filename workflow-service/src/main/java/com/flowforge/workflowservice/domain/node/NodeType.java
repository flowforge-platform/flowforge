package com.flowforge.workflowservice.domain.node;

public enum NodeType {
    START,
    END,

    TASK,
    EMAIL,
    HTTP_REQUEST,

    CONDITION,
    APPROVAL,
    DELAY
}