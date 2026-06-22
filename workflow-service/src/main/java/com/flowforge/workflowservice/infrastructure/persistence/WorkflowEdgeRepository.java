package com.flowforge.workflowservice.infrastructure.persistence;

import com.flowforge.workflowservice.domain.edge.WorkflowEdge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface WorkflowEdgeRepository extends JpaRepository<WorkflowEdge, UUID> {
   List<WorkflowEdge> findByWorkflow_Id(UUID workflowId);
}
