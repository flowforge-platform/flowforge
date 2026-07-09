package com.flowforge.workflowservice.application.execution;

import com.flowforge.workflowservice.application.execution.scheduler.NodeScheduler;
import com.flowforge.workflowservice.application.execution.state.TaskStateMachine;
import com.flowforge.workflowservice.application.execution.state.WorkflowStateMachine;
import com.flowforge.workflowservice.application.workflow.graph.GraphBuilder;
import com.flowforge.workflowservice.common.exception.BusinessException;
import com.flowforge.workflowservice.common.exception.ErrorCode;
import com.flowforge.workflowservice.domain.execution.TaskExecution;
import com.flowforge.workflowservice.domain.execution.TaskExecutionStatus;
import com.flowforge.workflowservice.domain.execution.WorkflowExecution;
import com.flowforge.workflowservice.domain.execution.WorkflowExecutionStatus;
import com.flowforge.workflowservice.domain.node.WorkflowNode;
import com.flowforge.workflowservice.domain.workflow.Workflow;
import com.flowforge.workflowservice.domain.workflow.WorkflowStatus;
import com.flowforge.workflowservice.application.execution.event.TaskCreatedEvent;
import com.flowforge.workflowservice.infrastructure.persistence.TaskExecutionRepository;
import com.flowforge.workflowservice.infrastructure.persistence.WorkflowExecutionRepository;
import com.flowforge.workflowservice.infrastructure.persistence.WorkflowRepository;
import com.flowforge.workflowservice.presentation.dto.response.GetExecutionResponse;
import com.flowforge.workflowservice.presentation.dto.response.StartExecutionResponse;
import com.flowforge.workflowservice.presentation.dto.response.TaskExecutionResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class WorkflowExecutionService {
    private final WorkflowRepository workflowRepository;
    private final WorkflowExecutionRepository workflowExecutionRepository;
    private final GraphBuilder graphBuilder;
    private final WorkflowStateMachine workflowStateMachine;
    private final NodeScheduler nodeScheduler;
    private final TaskExecutionRepository taskExecutionRepository;
    private final TaskStateMachine taskStateMachine;


    @Transactional
    public StartExecutionResponse startExecution(UUID workflowId,UUID organizationId,UUID userId){
        log.info(
                "Starting execution for workflow {}",
                workflowId
        );

        Workflow workflow = getPublishedWorkflow(
                workflowId,
                organizationId
        );

        WorkflowExecution workflowExecution = WorkflowExecution.builder()
                .workflow(workflow)
                .organizationId(organizationId)
                .startedBy(userId)
                .status(WorkflowExecutionStatus.PENDING)
                .build();

        log.info("BEFORE -> status={}, startedAt={}",
                workflowExecution.getStatus(),
                workflowExecution.getStartedAt());

        workflowStateMachine.startWorkflowExecution(workflowExecution);

        log.info("AFTER -> status={}, startedAt={}",
                workflowExecution.getStatus(),
                workflowExecution.getStartedAt());

        workflowExecution = workflowExecutionRepository.save(workflowExecution);

        WorkflowExecution finalWorkflowExecution = workflowExecution;
        List<TaskExecution> taskExecutions = workflow.getNodes()
                .stream()
                .map(node ->
                        TaskExecution.builder()
                                .workflowExecution(finalWorkflowExecution)
                                .node(node)
                                .status(TaskExecutionStatus.PENDING)
                                .build()
                )
                .toList();

        taskExecutionRepository.saveAll(taskExecutions);

        List<WorkflowNode> startNodes =
                graphBuilder.findStartNodes(
                        workflow.getNodes(),
                        workflow.getEdges()
                );

        nodeScheduler.schedule(
                workflowExecution,
                startNodes
        );

        return new StartExecutionResponse(
                workflowExecution.getId(),
                workflowExecution.getStatus()
        );
    }


    private Workflow getPublishedWorkflow(
            UUID workflowId,
            UUID organizationId
    ) {
        Workflow workflow = workflowRepository
                .findByIdAndOrganizationId(
                        workflowId,
                        organizationId
                )
                .orElseThrow(() ->
                        new BusinessException(
                                ErrorCode.WORKFLOW_NOT_FOUND
                        )
                );

        if (workflow.getStatus() != WorkflowStatus.PUBLISHED) {
            throw new BusinessException(
                    ErrorCode.WORKFLOW_NOT_PUBLISHED
            );
        }

        return workflow;
    }


    @Transactional(readOnly = true)
    public GetExecutionResponse getExecution(
            UUID executionId,
            UUID organizationId
    ){
        log.info(
                "Fetching workflow execution {}",
                executionId
        );
    WorkflowExecution execution = workflowExecutionRepository
            .findByIdAndOrganizationId(
                    executionId,
                    organizationId)
            .orElseThrow(()->
                    new BusinessException(
                            ErrorCode.WORKFLOW_EXECUTION_NOT_FOUND
                    )
            );

    return  new GetExecutionResponse(
            execution.getId(),
            execution.getWorkflow().getId(),
            execution.getStatus(),
            execution.getStartedAt(),
            execution.getCompletedAt()
    );
    }


    @Transactional(readOnly = true)
    public List<TaskExecutionResponse> getExecutionTasks(
            UUID executionId,
            UUID organizationId
    ) {
        log.info(
                "Fetching tasks for workflow execution {}",
                executionId
        );

        WorkflowExecution execution = workflowExecutionRepository
                .findByIdAndOrganizationId(
                        executionId,
                        organizationId
                )
                .orElseThrow(() ->
                        new BusinessException(
                                ErrorCode.WORKFLOW_EXECUTION_NOT_FOUND
                        )
                );

        return taskExecutionRepository
                .findByWorkflowExecutionId(execution.getId())
                .stream()
                .map(taskExecution -> new TaskExecutionResponse(
                        taskExecution.getId(),
                        taskExecution.getNode().getId(),
                        taskExecution.getNode().getNodeType().name(),
                        taskExecution.getStatus(),
                        taskExecution.getStartedAt(),
                        taskExecution.getCompletedAt(),
                        taskExecution.getErrorMessage()
                ))
                .toList();
    }

    public List<GetExecutionResponse> getExecutions(UUID organizationId) {
        log.info(
                "Fetching workflow executions for organization {}",
                organizationId
        );

        return workflowExecutionRepository
                .findAllByOrganizationIdOrderByStartedAtDesc(organizationId)
                .stream()
                .map(workflowExecution ->
                        new GetExecutionResponse(
                                workflowExecution.getId(),
                                workflowExecution.getWorkflow().getId(),
                                workflowExecution.getStatus(),
                                workflowExecution.getStartedAt(),
                                workflowExecution.getCompletedAt()
                        ) )
                .toList();
    }
}
