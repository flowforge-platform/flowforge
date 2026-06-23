package com.flowforge.workflowservice.presentation.rest;


import com.flowforge.workflowservice.application.workflow.WorkflowService;
import com.flowforge.workflowservice.presentation.dto.CreateWorkflowRequest;
import com.flowforge.workflowservice.presentation.dto.UpdateWorkflowRequest;
import com.flowforge.workflowservice.presentation.dto.WorkflowResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/workflows")
@RequiredArgsConstructor
public class WorkflowController {

    private final WorkflowService workflowService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WorkflowResponse createWorkflow(
            @RequestHeader("X-User-Id") UUID userId,
            @RequestHeader("X-Organization-Id") UUID organizationId,
            @Valid @RequestBody CreateWorkflowRequest request
    ) {
        return workflowService.createWorkflow(
                request,
                userId,
                organizationId
        );
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<WorkflowResponse> getAllWorkflows(
            @RequestHeader("X-Organization-Id")
            UUID organizationId
    ) {
        return   workflowService.getAllWorkflows(organizationId);
    }

    @GetMapping("/{id}")
    public WorkflowResponse getWorkflowById(
            @PathVariable UUID id,
            @RequestHeader("X-Organization-Id")
            UUID organizationId
    ) {
        return workflowService.getWorkflowById(id, organizationId);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public WorkflowResponse updateWorkflow(
            @PathVariable UUID id,
            @RequestHeader("X-Organization-Id")
            UUID organizationId,
            @Valid
            @RequestBody
            UpdateWorkflowRequest request
    ) {
        return workflowService.updateWorkflow(
                id,
                organizationId,
                request
        );
    }

    @DeleteMapping("/{workflowId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteWorkflow(
            @PathVariable UUID workflowId,
            @RequestHeader("X-Organization-Id") UUID organizationId
    ) {
        workflowService.deleteWorkflow(workflowId,organizationId);
    }

    @PostMapping("/{workflowId}/publish")
    @ResponseStatus(HttpStatus.OK)
    public void publish(
            @PathVariable UUID workflowId,
            @RequestHeader("X-Organization-Id") UUID organizationId
            ){
        workflowService.publish(workflowId,organizationId);
    }
}
