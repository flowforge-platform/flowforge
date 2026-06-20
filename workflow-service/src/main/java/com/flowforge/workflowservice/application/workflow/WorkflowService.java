package com.flowforge.workflowservice.application.workflow;

import com.flowforge.workflowservice.domain.workflow.Workflow;
import com.flowforge.workflowservice.domain.workflow.WorkflowStatus;
import com.flowforge.workflowservice.infrastructure.persistence.WorkflowRepository;
import com.flowforge.workflowservice.presentation.dto.CreateWorkflowRequest;
import com.flowforge.workflowservice.presentation.dto.WorkflowResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WorkflowService {

    private final WorkflowRepository workflowRepository;
    private final WorkflowMapper workflowMapper;

    public WorkflowResponse createWorkflow(
            CreateWorkflowRequest request,
            UUID userId,
            UUID organizationId
    ) {

        Workflow workflow = Workflow.builder()
                .name(request.name())
                .description(request.description())
                .organizationId(organizationId)
                .createdBy(userId)
                .status(WorkflowStatus.DRAFT)
                .build();

        Workflow saved = workflowRepository.save(workflow);

        return workflowMapper.toResponse(saved);
    }

    public List<WorkflowResponse> getAllWorkflows(UUID organizationId) {
        return workflowRepository.findByOrganizationId(organizationId)
                .stream()
                .map(workflowMapper::toResponse)
                .toList();
    }

    public WorkflowResponse getWorkflowById(
            UUID workflowId,
            UUID organizationId
    ) {
        Workflow workflow = workflowRepository
                .findByIdAndOrganizationId(workflowId, organizationId)
                .orElseThrow(() ->
                        new RuntimeException("Workflow not found"));

        return workflowMapper.toResponse(workflow);
    }
}