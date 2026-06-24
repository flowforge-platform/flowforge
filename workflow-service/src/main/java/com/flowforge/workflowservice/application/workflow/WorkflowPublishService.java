package com.flowforge.workflowservice.application.workflow;

import com.flowforge.workflowservice.application.workflow.graph.GraphBuilder;
import com.flowforge.workflowservice.application.workflow.graph.TopologicalSorter;
import com.flowforge.workflowservice.common.exception.BusinessException;
import com.flowforge.workflowservice.common.exception.ErrorCode;
import com.flowforge.workflowservice.domain.workflow.Workflow;
import com.flowforge.workflowservice.domain.workflow.WorkflowStatus;
import com.flowforge.workflowservice.infrastructure.persistence.WorkflowRepository;
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
public class WorkflowPublishService {
    private final WorkflowRepository workflowRepository;
    private final WorkflowValidationService workflowValidationService;
    private final GraphBuilder graphBuilder;
    private final TopologicalSorter topologicalSorter;

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

        Map<UUID, List<UUID>> graph = graphBuilder.buildGraph(workflow.getNodes(),workflow.getEdges());

        // Verify workflow has a valid execution order
        List<UUID> executionOrder =
                topologicalSorter.sort(graph);

        log.debug(
                "Generated execution order with {} nodes",
                executionOrder.size()
        );

        workflow.setStatus(WorkflowStatus.PUBLISHED);

        log.info(
                "Workflow {} published successfully",
                workflowId
        );
    }
}
