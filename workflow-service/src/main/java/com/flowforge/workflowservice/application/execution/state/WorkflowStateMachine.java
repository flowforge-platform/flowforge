package com.flowforge.workflowservice.application.execution.state;

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

    private void startWorkflowExecution(WorkflowExecution execution) {
        if (execution.getStatus() != WorkflowExecutionStatus.PENDING) {
            throw new IllegalStateException(
                    "Workflow execution can only start from PENDING state"
            );
        }
        execution.setStatus(WorkflowExecutionStatus.RUNNING);
        execution.setStartedAt(Instant.now());

        workflowExecutionRepository.save(execution);
    }

    private void completeWorkflowExecution(WorkflowExecution execution) {

        if (execution.getStatus() != WorkflowExecutionStatus.RUNNING) {
            throw new IllegalStateException(
                    "Workflow execution can only complete from RUNNING state"
            );
        }
        execution.setStatus(WorkflowExecutionStatus.COMPLETED);
        execution.setCompletedAt(Instant.now());

        workflowExecutionRepository.save(execution);
    }

    private void failWorkflowExecution(
            WorkflowExecution execution,
            String reason
    ) {

        if (execution.getStatus() != WorkflowExecutionStatus.RUNNING) {
            throw new IllegalStateException(
                    "Workflow execution can only fail from RUNNING state"
            );
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
