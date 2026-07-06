package com.flowforge.workflowservice.application.execution.resolver;

import com.flowforge.workflowservice.domain.edge.WorkflowEdge;
import com.flowforge.workflowservice.domain.execution.WorkflowExecution;
import com.flowforge.workflowservice.domain.node.WorkflowNode;
import com.flowforge.workflowservice.infrastructure.persistence.WorkflowEdgeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DefaultDependencyResolver implements DependencyResolver {

    private final WorkflowEdgeRepository workflowEdgeRepository;

    @Override
    public List<WorkflowNode> resolveNextNodes(
            WorkflowExecution execution,
            WorkflowNode completedNode
    ) {
       List<WorkflowEdge> edges = workflowEdgeRepository.findBySourceNode(completedNode);
        return edges.stream()
                .map(WorkflowEdge::getTargetNode)
                .toList();
    }
}
