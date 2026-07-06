package com.flowforge.workflowservice.application.execution.state;

import com.flowforge.workflowservice.domain.execution.TaskExecution;
import com.flowforge.workflowservice.domain.execution.TaskExecutionStatus;
import com.flowforge.workflowservice.infrastructure.persistence.TaskExecutionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskStateMachine {
    private final TaskExecutionRepository taskExecutionRepository;

    private void startTaskExecution(TaskExecution task) {

        if (task.getStatus() != TaskExecutionStatus.PENDING) {
            throw new IllegalStateException(
                    "Task can only start from PENDING state"
            );
        }
        task.setStatus(TaskExecutionStatus.RUNNING);
        task.setStartedAt(Instant.now());

        taskExecutionRepository.save(task);
    }

    private void completeTaskExecution(TaskExecution task) {

        if (task.getStatus() != TaskExecutionStatus.RUNNING) {
            throw new IllegalStateException(
                    "Task can only complete from RUNNING state"
            );
        }
        task.setStatus(TaskExecutionStatus.SUCCESS);
        task.setCompletedAt(Instant.now());

        taskExecutionRepository.save(task);
    }

    private void failTaskExecution(
            TaskExecution task,
            String error
    ) {

        if (task.getStatus() != TaskExecutionStatus.RUNNING) {
            throw new IllegalStateException(
                    "Task can only fail from RUNNING state"
            );
        }
        task.setStatus(TaskExecutionStatus.FAILED);
        task.setCompletedAt(Instant.now());
        task.setErrorMessage(error);

        taskExecutionRepository.save(task);
    }
}
