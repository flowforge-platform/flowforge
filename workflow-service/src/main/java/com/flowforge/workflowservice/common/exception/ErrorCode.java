package com.flowforge.workflowservice.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    WORKFLOW_NOT_FOUND(HttpStatus.NOT_FOUND, "Workflow not found"),
    ACCESS_DENIED(HttpStatus.FORBIDDEN, "Access denied"),
    INVALID_REQUEST(HttpStatus.BAD_REQUEST, "Invalid request"),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error"),
    WORKFLOW_HAS_NO_NODES(HttpStatus.BAD_REQUEST, "Workflow must contain at least one node"),
    WORKFLOW_MISSING_START_NODE(HttpStatus.BAD_REQUEST, "Workflow must contain exactly one START node"),
    WORKFLOW_MULTIPLE_START_NODES(HttpStatus.BAD_REQUEST, "Workflow cannot contain multiple START nodes"),
    WORKFLOW_MISSING_END_NODE(HttpStatus.BAD_REQUEST, "Workflow must contain exactly one END node"),
    WORKFLOW_MULTIPLE_END_NODES(HttpStatus.BAD_REQUEST, "Workflow cannot contain multiple END nodes"),
    WORKFLOW_CYCLE_DETECTED(HttpStatus.LOOP_DETECTED,"cycle detected in workflow"),
    WORKFLOW_ALREADY_PUBLISHED(HttpStatus.CONFLICT,"workflow already published"),
    INVALID_WORKFLOW_DEFINITION(HttpStatus.BAD_REQUEST,"Workflow definition contains invalid node references"),
    WORKFLOW_CANNOT_BE_MODIFIED(HttpStatus.CONFLICT,"Published workflows cannot be modified"),
    WORKFLOW_NOT_PUBLISHED(HttpStatus.CONFLICT,"workflow must be published before execution");

    private final HttpStatus status;
    private final String message;
}
