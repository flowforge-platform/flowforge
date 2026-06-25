package com.flowforge.workflowservice.infrastructure.persistence;

import com.flowforge.workflowservice.domain.node.WorkflowNode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface WorkflowNodeRepository extends JpaRepository<WorkflowNode,UUID> {
    List<WorkflowNode> findByWorkflow_Id(UUID workflowId);
    void deleteByWorkflow_Id(UUID workflowId);
}