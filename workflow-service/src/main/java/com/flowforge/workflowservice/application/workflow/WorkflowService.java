package com.flowforge.workflowservice.application.workflow;

import com.flowforge.workflowservice.common.exception.BusinessException;
import com.flowforge.workflowservice.common.exception.ErrorCode;
import com.flowforge.workflowservice.domain.workflow.Workflow;
import com.flowforge.workflowservice.domain.workflow.WorkflowStatus;
import com.flowforge.workflowservice.infrastructure.persistence.WorkflowRepository;
import com.flowforge.workflowservice.presentation.dto.request.*;
import com.flowforge.workflowservice.presentation.dto.response.WorkflowResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WorkflowService {

    private final WorkflowRepository workflowRepository;
    private final WorkflowMapper workflowMapper;

    @Transactional
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

    @Transactional(readOnly = true)
    public WorkflowResponse getWorkflowById(
            UUID workflowId,
            UUID organizationId
    ) {
        Workflow workflow = workflowRepository
                .findByIdAndOrganizationId(workflowId, organizationId)
                .orElseThrow(() ->
                        new BusinessException(ErrorCode.WORKFLOW_NOT_FOUND));
        return workflowMapper.toResponse(workflow);
    }

    @Transactional
    public WorkflowResponse updateWorkflow(
            UUID workflowId,
            UUID organizationId,
            UpdateWorkflowRequest request
    ) {
        Workflow workflow = workflowRepository
                .findByIdAndOrganizationId(workflowId, organizationId)
                .orElseThrow(() ->
                        new BusinessException(ErrorCode.WORKFLOW_NOT_FOUND));
        workflow.setName(request.name());
        workflow.setDescription(request.description());
        Workflow updated = workflowRepository.save(workflow);
        return workflowMapper.toResponse(updated);
    }

    @Transactional
    public void deleteWorkflow(UUID workflowId,UUID organizationId) {
        Workflow workflow = workflowRepository
                .findByIdAndOrganizationId(workflowId, organizationId)
                .orElseThrow(() -> new BusinessException(
                        ErrorCode.WORKFLOW_NOT_FOUND
                ));
        workflowRepository.delete(workflow);
    }
}
