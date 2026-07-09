package com.flowforge.workflowservice.application.execution.state;

import com.flowforge.workflowservice.common.exception.BusinessException;
import com.flowforge.workflowservice.common.exception.ErrorCode;
import com.flowforge.workflowservice.domain.execution.WorkflowExecution;
import com.flowforge.workflowservice.domain.execution.WorkflowExecutionStatus;
import com.flowforge.workflowservice.infrastructure.persistence.WorkflowExecutionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
@Slf4j
public class WorkflowStateMachine {
    private final WorkflowExecutionRepository workflowExecutionRepository;

    public void startWorkflowExecution(WorkflowExecution execution) {
        if (execution.getStatus() != WorkflowExecutionStatus.PENDING) {
            throw new BusinessException(ErrorCode.INVALID_WORKFLOW_STATE_TRANSITION);
        }

        log.info("INSIDE BEFORE -> status={}, startedAt={}",
                execution.getStatus(),
                execution.getStartedAt());

        execution.setStatus(WorkflowExecutionStatus.RUNNING);

        execution.setStartedAt(Instant.now());
        log.info("INSIDE AFTER -> status={}, startedAt={}",
                execution.getStatus(),
                execution.getStartedAt());

    }

    public void completeWorkflowExecution(WorkflowExecution execution) {

        if (execution.getStatus() != WorkflowExecutionStatus.RUNNING) {
            throw new BusinessException(ErrorCode.INVALID_WORKFLOW_STATE_TRANSITION);
        }
        execution.setStatus(WorkflowExecutionStatus.COMPLETED);
        execution.setCompletedAt(Instant.now());

        workflowExecutionRepository.save(execution);
    }

    public void failWorkflowExecution(
            WorkflowExecution execution,
            String reason
    ) {

        if (execution.getStatus() != WorkflowExecutionStatus.RUNNING) {
            throw new BusinessException(ErrorCode.INVALID_WORKFLOW_STATE_TRANSITION);
        }
        execution.setStatus(WorkflowExecutionStatus.FAILED);
        execution.setCompletedAt(Instant.now());

        workflowExecutionRepository.save(execution);

        log.error(
                "Workflow {} failed : {}",
                execution.getId(),
                reason
        );
    }
}
