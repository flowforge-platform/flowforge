package com.flowforge.workflowservice.presentation.rest;

import com.flowforge.workflowservice.application.execution.WorkflowExecutionService;
import com.flowforge.workflowservice.presentation.dto.response.GetExecutionResponse;
import com.flowforge.workflowservice.presentation.dto.response.StartExecutionResponse;
import com.flowforge.workflowservice.presentation.dto.response.TaskExecutionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/executions")
@RequiredArgsConstructor
public class ExecutionController {
    private final WorkflowExecutionService workflowExecutionService;
    @PostMapping("/{workflowId}")
    @ResponseStatus(HttpStatus.CREATED)
    public StartExecutionResponse startExecution(
            @PathVariable UUID workflowId,
            @RequestHeader("X-Organization-Id") UUID organizationId,
            @RequestHeader("X-User-Id") UUID userId
    ) {
        return workflowExecutionService.startExecution(
                workflowId,
                organizationId,
                userId
        );
    }

    @GetMapping("/{executionId}")
    public GetExecutionResponse getExecution(
            @PathVariable UUID executionId,
            @RequestHeader("X-Organization-Id") UUID organizationId
    ) {
        return workflowExecutionService.getExecution(
                executionId,
                organizationId
        );
    }

    @GetMapping("/{executionId}/tasks")
    public List<TaskExecutionResponse> getExecutionTasks(
            @PathVariable UUID executionId,
            @RequestHeader("X-Organization-Id") UUID organizationId
    ) {
        return workflowExecutionService.getExecutionTasks(
                executionId,
                organizationId
        );
    }

    @GetMapping
    public List<GetExecutionResponse> getExecutions(
            @RequestHeader("X-Organization-Id") UUID organizationId
    ) {
        return workflowExecutionService.getExecutions(
                organizationId
        );
    }
}