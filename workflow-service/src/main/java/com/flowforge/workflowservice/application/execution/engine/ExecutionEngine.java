package com.flowforge.workflowservice.application.execution.engine;

import com.flowforge.workflowservice.application.execution.event.TaskCompletedEvent;
import com.flowforge.workflowservice.application.execution.state.TaskStateMachine;
import com.flowforge.workflowservice.application.execution.state.WorkflowStateMachine;
import com.flowforge.workflowservice.common.exception.BusinessException;
import com.flowforge.workflowservice.common.exception.ErrorCode;
import com.flowforge.workflowservice.domain.execution.TaskExecution;
import com.flowforge.workflowservice.infrastructure.persistence.TaskExecutionRepository;
import com.flowforge.workflowservice.infrastructure.persistence.WorkflowExecutionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExecutionEngine {
    private final TaskExecutionRepository taskExecutionRepository;
    private final WorkflowExecutionRepository workflowExecutionRepository;
    private final TaskStateMachine taskStateMachine;
    private final WorkflowStateMachine workflowStateMachine;

    @Transactional
    public void handleTaskCompleted(TaskCompletedEvent event) {
        TaskExecution taskExecution = taskExecutionRepository.findById(event.taskExecutionId())
                .orElseThrow(()-> new BusinessException(ErrorCode.TASK_EXECUTION_NOT_FOUND));
        taskStateMachine.completeTaskExecution(taskExecution);
    }
}
