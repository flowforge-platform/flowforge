package com.flowforge.workflowservice.infrastructure.persistence;

import com.flowforge.workflowservice.domain.execution.WorkflowExecution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface WorkflowExecutionRepository extends JpaRepository<WorkflowExecution, UUID> {
    Optional<WorkflowExecution> findByIdAndOrganizationId(
            UUID id,
            UUID organizationId
    );

    List<WorkflowExecution> findAllByOrganizationIdOrderByStartedAtDesc(
            UUID organizationId
    );
}
