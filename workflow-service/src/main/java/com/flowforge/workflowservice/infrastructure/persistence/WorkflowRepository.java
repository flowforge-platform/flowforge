package com.flowforge.workflowservice.infrastructure.persistence;

import com.flowforge.workflowservice.domain.workflow.Workflow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface WorkflowRepository extends JpaRepository<Workflow, UUID> {
}