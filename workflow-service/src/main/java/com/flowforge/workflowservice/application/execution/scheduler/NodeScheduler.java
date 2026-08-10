package com.flowforge.workflowservice.application.execution.scheduler;

import com.flowforge.workflowservice.application.execution.event.TaskCreatedEvent;
import com.flowforge.workflowservice.application.execution.port.EventPublisher;
import com.flowforge.workflowservice.application.execution.state.TaskStateMachine;
import com.flowforge.workflowservice.common.exception.BusinessException;
import com.flowforge.workflowservice.common.exception.ErrorCode;
import com.flowforge.workflowservice.domain.execution.TaskExecution;
import com.flowforge.workflowservice.domain.execution.WorkflowExecution;
import com.flowforge.workflowservice.domain.node.NodeType;
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
public class NodeScheduler {
    private final TaskExecutionRepository taskExecutionRepository;
    private final EventPublisher eventPublisher;
    private  final TaskStateMachine taskStateMachine;

    @Transactional
    public void schedule(
            WorkflowExecution execution,
            WorkflowNode node
    ) {
            log.info("Entered NodeScheduler");

            TaskExecution taskExecution =
                    taskExecutionRepository
                            .findByWorkflowExecutionIdAndNodeId(
                                    execution.getId(),
                                    node.getId()
                            )
                            .orElseThrow(()->new BusinessException(ErrorCode.TASK_EXECUTION_NOT_FOUND));

            log.info(
                    "Scheduling {} ({})",
                    node.getNodeKey(),
                    node.getNodeType()
            );


                taskStateMachine.startTaskExecution(taskExecution);
                taskExecutionRepository.save(taskExecution);

                TaskCreatedEvent event = new TaskCreatedEvent(
                        execution.getId(),
                        taskExecution.getId(),
                        node.getId(),
                        node.getNodeType().name(),
                        node.getConfiguration()
                );

            log.info(
                    "Publishing task-created for node {} ({})",
                    node.getNodeKey(),
                    node.getNodeType()
            );
                eventPublisher.publishTaskCreated(event);


    }
}
