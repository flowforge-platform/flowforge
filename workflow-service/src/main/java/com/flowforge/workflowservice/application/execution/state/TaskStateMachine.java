package com.flowforge.workflowservice.application.execution.state;

import com.flowforge.workflowservice.common.exception.BusinessException;
import com.flowforge.workflowservice.common.exception.ErrorCode;
import com.flowforge.workflowservice.domain.execution.TaskExecution;
import com.flowforge.workflowservice.domain.execution.TaskExecutionStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
@Slf4j
public class TaskStateMachine {
    public void startTaskExecution(TaskExecution task) {

        if (task.getStatus() != TaskExecutionStatus.PENDING) {
            throw new BusinessException(ErrorCode.INVALID_TASK_STATE_TRANSITION);
        }
        task.setStatus(TaskExecutionStatus.RUNNING);
        task.setStartedAt(Instant.now());
    }
    public void completeTaskExecution(TaskExecution task) {
        if (task.getStatus() != TaskExecutionStatus.RUNNING) {
            throw new BusinessException(ErrorCode.INVALID_TASK_STATE_TRANSITION);
        }
        task.setStatus(TaskExecutionStatus.SUCCESS);
        task.setCompletedAt(Instant.now());
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

    }
}
