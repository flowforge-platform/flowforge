package com.flowforge.workflowservice.application.execution.resolver;

import com.flowforge.workflowservice.application.execution.condtion.ConditionExecutionService;
import com.flowforge.workflowservice.common.exception.BusinessException;
import com.flowforge.workflowservice.common.exception.ErrorCode;
import com.flowforge.workflowservice.domain.edge.BranchType;
import com.flowforge.workflowservice.domain.edge.WorkflowEdge;
import com.flowforge.workflowservice.domain.execution.TaskExecution;
import com.flowforge.workflowservice.domain.node.NodeType;
import com.flowforge.workflowservice.domain.node.WorkflowNode;
import com.flowforge.workflowservice.infrastructure.persistence.WorkflowEdgeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DefaultDependencyResolver implements DependencyResolver {

    private final WorkflowEdgeRepository workflowEdgeRepository;
    private final ConditionExecutionService conditionExecutionService;

    @Override
    public List<WorkflowNode> resolveNextNodes(
            TaskExecution completedTask
    ) {
        WorkflowNode completedNode = completedTask.getNode();

        List<WorkflowNode> nextNodes = new ArrayList<>();

        List<WorkflowEdge> edges = workflowEdgeRepository.findBySourceNode(completedNode);

        for (WorkflowEdge edge : edges){
            WorkflowNode targetNode = edge.getTargetNode();
            if (targetNode.getNodeType() != NodeType.CONDITION){
                nextNodes.add(targetNode);
                continue;
            }
            BranchType branch = conditionExecutionService.execute(completedTask.getOutput(),targetNode);

            WorkflowEdge selectedEdge = workflowEdgeRepository
                    .findBySourceNodeAndBranchType(targetNode,branch)
                    .orElseThrow(() ->
                            new BusinessException(
                                    ErrorCode.CONDITION_BRANCH_NOT_FOUND
                            ));

            nextNodes.add(selectedEdge.getTargetNode());

        }
        return  nextNodes;
    }
}
