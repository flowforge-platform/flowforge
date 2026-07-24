package com.flowforge.workflowservice.application.execution.engine;

import com.flowforge.workflowservice.application.execution.event.TaskCompletedEvent;
import com.flowforge.workflowservice.application.execution.resolver.DependencyResolver;
import com.flowforge.workflowservice.application.execution.scheduler.NodeScheduler;
import com.flowforge.workflowservice.application.execution.state.TaskStateMachine;
import com.flowforge.workflowservice.application.execution.state.WorkflowStateMachine;
import com.flowforge.workflowservice.common.exception.BusinessException;
import com.flowforge.workflowservice.common.exception.ErrorCode;
import com.flowforge.workflowservice.domain.execution.TaskExecution;
import com.flowforge.workflowservice.domain.node.WorkflowNode;
import com.flowforge.workflowservice.infrastructure.persistence.TaskExecutionRepository;
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
    private final TaskStateMachine taskStateMachine;
    private final WorkflowStateMachine workflowStateMachine;
    private final DependencyResolver dependencyResolver;
    private final NodeScheduler nodeScheduler;

    @Transactional
    public void handleTaskCompleted(TaskCompletedEvent event) {
        TaskExecution taskExecution = taskExecutionRepository.findById(event.taskExecutionId())
                .orElseThrow(()-> new BusinessException(ErrorCode.TASK_EXECUTION_NOT_FOUND));
        taskStateMachine.completeTaskExecution(taskExecution);
        List<WorkflowNode> runnableNodes =  dependencyResolver.resolveNextNodes(
                taskExecution.getWorkflowExecution(),
                taskExecution.getNode());

        if (runnableNodes.isEmpty()) {
            workflowStateMachine.completeWorkflowExecution(
                    taskExecution.getWorkflowExecution()
            );
            log.info(
                    "WorkflowExecution={} completed successfully",
                    taskExecution.getWorkflowExecution().getId()
            );
            return;
        }
        nodeScheduler.schedule(taskExecution.getWorkflowExecution(),runnableNodes);
        log.info(
                "WorkflowExecution={} | Completed Node={} | Next Nodes={}",
                taskExecution.getWorkflowExecution().getId(),
                taskExecution.getNode().getNodeType(),
                runnableNodes.stream()
                        .map(WorkflowNode::getNodeType)
                        .toList()
        );
    }
}
