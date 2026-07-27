package com.flowforge.workflowservice.application.execution.engine;

import com.flowforge.workflowservice.application.execution.SystemNodeExecutor;
import com.flowforge.workflowservice.application.execution.event.TaskFailedEvent;
import com.flowforge.workflowservice.application.execution.event.TaskSucceededEvent;
import com.flowforge.workflowservice.application.execution.resolver.DependencyResolver;
import com.flowforge.workflowservice.application.execution.scheduler.NodeScheduler;
import com.flowforge.workflowservice.application.execution.state.TaskStateMachine;
import com.flowforge.workflowservice.application.execution.state.WorkflowStateMachine;
import com.flowforge.workflowservice.common.exception.BusinessException;
import com.flowforge.workflowservice.common.exception.ErrorCode;
import com.flowforge.workflowservice.domain.execution.TaskExecution;
import com.flowforge.workflowservice.domain.execution.WorkflowExecution;
import com.flowforge.workflowservice.domain.node.NodeType;
import com.flowforge.workflowservice.domain.node.WorkflowNode;
import com.flowforge.workflowservice.infrastructure.persistence.TaskExecutionRepository;
import com.flowforge.workflowservice.infrastructure.persistence.WorkflowExecutionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExecutionEngine {
    private final TaskExecutionRepository taskExecutionRepository;
    private final WorkflowStateMachine workflowStateMachine;
    private final DependencyResolver dependencyResolver;
    private final NodeScheduler nodeScheduler;
    private final TaskStateMachine taskStateMachine;
    private final SystemNodeExecutor systemNodeExecutor;
    private final WorkflowExecutionRepository workflowExecutionRepository;

    @Transactional
    public void handleTaskCompleted(TaskExecution taskExecution) {
        log.info(
                "ExecutionEngine handling {}",
                taskExecution.getNode().getNodeType()
        );

        List<WorkflowNode> runnableNodes =  dependencyResolver.resolveNextNodes(
                taskExecution.getWorkflowExecution(),
                taskExecution.getNode());

        log.info(
                "Resolved next nodes {}",
                runnableNodes.stream()
                        .map(WorkflowNode::getNodeType)
                        .toList()
        );

        if (runnableNodes.isEmpty()) {
            WorkflowExecution workflowExecution = taskExecution.getWorkflowExecution();
            workflowStateMachine.completeWorkflowExecution(
                    workflowExecution
            );
            workflowExecutionRepository.save(workflowExecution);
            log.info(
                    "WorkflowExecution={} completed successfully",
                    taskExecution.getWorkflowExecution().getId()
            );
            return;
        }

        for (WorkflowNode node : runnableNodes) {

            if (node.getNodeType() == NodeType.START ||
                    node.getNodeType() == NodeType.END) {

                TaskExecution nextTask =
                        taskExecutionRepository
                                .findByWorkflowExecutionIdAndNodeId(
                                        taskExecution.getWorkflowExecution().getId(),
                                        node.getId()
                                )
                                .orElseThrow(() ->
                                        new BusinessException(ErrorCode.TASK_EXECUTION_NOT_FOUND));

                systemNodeExecutor.execute(nextTask);

                handleTaskCompleted(nextTask);

            } else {

                nodeScheduler.schedule(
                        taskExecution.getWorkflowExecution(),
                        node
                );
            }
        }
        log.info(
                "WorkflowExecution={} | Completed Node={} | Next Nodes={}",
                taskExecution.getWorkflowExecution().getId(),
                taskExecution.getNode().getNodeType(),
                runnableNodes.stream()
                        .map(WorkflowNode::getNodeType)
                        .toList()
        );
    }

    @Transactional
    public void handleTaskCompleted(TaskSucceededEvent event) {

        TaskExecution taskExecution =
                taskExecutionRepository.findById(event.taskExecutionId())
                        .orElseThrow(() ->
                                new BusinessException(ErrorCode.TASK_EXECUTION_NOT_FOUND));

        taskStateMachine.completeTaskExecution(taskExecution);

        handleTaskCompleted(taskExecution);
    }

    @Transactional
    public void handleTaskFailed(TaskFailedEvent event) {
        TaskExecution taskExecution =
                taskExecutionRepository.findById(event.taskExecutionId())
                        .orElseThrow(() ->
                                new BusinessException(ErrorCode.TASK_EXECUTION_NOT_FOUND));

        taskStateMachine.failTaskExecution(taskExecution, event.message());
        workflowStateMachine.failWorkflowExecution(taskExecution.getWorkflowExecution(),taskExecution.getErrorMessage());
        workflowExecutionRepository.save(taskExecution.getWorkflowExecution());
    }
}
