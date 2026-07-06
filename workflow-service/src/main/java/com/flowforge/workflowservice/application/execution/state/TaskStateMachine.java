package com.flowforge.workflowservice.application.execution.state;

import com.flowforge.workflowservice.common.exception.BusinessException;
import com.flowforge.workflowservice.common.exception.ErrorCode;
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

    public void startTaskExecution(TaskExecution task) {

        if (task.getStatus() != TaskExecutionStatus.PENDING) {
            throw new BusinessException(ErrorCode.INVALID_TASK_STATE_TRANSITION);
        }
        task.setStatus(TaskExecutionStatus.RUNNING);
        task.setStartedAt(Instant.now());

        taskExecutionRepository.save(task);
    }

    public void completeTaskExecution(TaskExecution task) {

        if (task.getStatus() != TaskExecutionStatus.RUNNING) {
            throw new BusinessException(ErrorCode.INVALID_TASK_STATE_TRANSITION);
        }
        task.setStatus(TaskExecutionStatus.SUCCESS);
        task.setCompletedAt(Instant.now());

        taskExecutionRepository.save(task);
    }

    public void failTaskExecution(
            TaskExecution task,
            String error
    ) {

        if (task.getStatus() != TaskExecutionStatus.RUNNING) {
            throw new BusinessException(ErrorCode.INVALID_TASK_STATE_TRANSITION);
        }
        task.setStatus(TaskExecutionStatus.FAILED);
        task.setCompletedAt(Instant.now());
        task.setErrorMessage(error);

        taskExecutionRepository.save(task);
    }
}
