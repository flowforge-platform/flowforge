package com.flowforge.workflowservice.application.execution;

import com.flowforge.workflowservice.application.execution.state.TaskStateMachine;
import com.flowforge.workflowservice.domain.execution.TaskExecution;
import com.flowforge.workflowservice.infrastructure.persistence.TaskExecutionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class SystemNodeExecutor {
    private final TaskStateMachine taskStateMachine;
    private final TaskExecutionRepository taskExecutionRepository;

    public void execute(TaskExecution taskExecution) {

        log.info("Executing system node {}",
                taskExecution.getNode().getNodeType());

        taskStateMachine.startTaskExecution(taskExecution);
        taskExecutionRepository.save(taskExecution);
        taskStateMachine.completeTaskExecution(taskExecution);
        taskExecutionRepository.save(taskExecution);
        log.info("Completed system node {}",
                taskExecution.getNode().getNodeType());

    }

}