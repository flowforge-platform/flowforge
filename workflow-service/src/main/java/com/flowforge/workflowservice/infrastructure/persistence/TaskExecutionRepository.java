package com.flowforge.workflowservice.infrastructure.persistence;

import com.flowforge.workflowservice.domain.execution.TaskExecution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TaskExecutionRepository extends JpaRepository<TaskExecution, UUID> {
    List<TaskExecution> findByWorkflowExecutionId(
            UUID workflowExecutionId
    );
}
