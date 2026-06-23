package com.flowforge.workflowservice.application.workflow;
import com.flowforge.workflowservice.application.workflow.graph.GraphBuilder;
import com.flowforge.workflowservice.application.workflow.graph.TopologicalSorter;
import com.flowforge.workflowservice.common.exception.BusinessException;
import com.flowforge.workflowservice.common.exception.ErrorCode;
import com.flowforge.workflowservice.domain.workflow.Workflow;
import com.flowforge.workflowservice.domain.workflow.WorkflowStatus;
import com.flowforge.workflowservice.infrastructure.persistence.WorkflowRepository;
import com.flowforge.workflowservice.presentation.dto.CreateWorkflowRequest;
import com.flowforge.workflowservice.presentation.dto.UpdateWorkflowRequest;
import com.flowforge.workflowservice.presentation.dto.WorkflowResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class WorkflowService {

    private final WorkflowRepository workflowRepository;
    private final WorkflowMapper workflowMapper;
    private final WorkflowValidationService workflowValidationService;
    private final TopologicalSorter topologicalSorter;
    private final GraphBuilder graphBuilder;

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
        System.out.println("workflowId = " + workflowId);
        System.out.println("organizationId = " + organizationId);
        Workflow workflow = workflowRepository
                .findByIdAndOrganizationId(workflowId, organizationId)
                .orElseThrow(() -> new BusinessException(
                        ErrorCode.WORKFLOW_NOT_FOUND
                ));
        workflowRepository.delete(workflow);
    }

    @Transactional
    public void publish(UUID workflowId, UUID organizationId) {
        log.info(
                "Publishing workflow {} for organization {}",
                workflowId,
                organizationId
        );

        Workflow workflow = workflowRepository
                .findByIdAndOrganizationId(workflowId,organizationId)
                .orElseThrow(()->new BusinessException(ErrorCode.WORKFLOW_NOT_FOUND));

        if(workflow.getStatus() == WorkflowStatus.PUBLISHED){
            throw new BusinessException(ErrorCode.WORKFLOW_ALREADY_PUBLISHED);
        }

        workflowValidationService.validate(workflowId);

        Map<UUID,List<UUID>> graph = graphBuilder.buildGraph(workflow.getNodes(),workflow.getEdges());

        // Verify workflow has a valid execution order
        topologicalSorter.sort(graph);

        workflow.setStatus(WorkflowStatus.PUBLISHED);

        log.info(
                "Workflow {} published successfully",
                workflowId
        );
    }
}
