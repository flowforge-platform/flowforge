package com.flowforge.workflowservice.application.execution.resolver;

import com.flowforge.workflowservice.domain.execution.WorkflowExecution;
import com.flowforge.workflowservice.domain.node.WorkflowNode;

import java.util.List;

public interface DependencyResolver {

    List<WorkflowNode> resolveNextNodes(
            WorkflowExecution execution,
            WorkflowNode completedNode
    );

}