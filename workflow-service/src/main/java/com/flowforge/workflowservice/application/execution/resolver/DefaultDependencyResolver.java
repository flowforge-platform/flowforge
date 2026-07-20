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
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
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
            log.info("Edge: {} -> {}",
                    completedNode.getNodeType(),
                    targetNode.getNodeType());

            if (targetNode.getNodeType() != NodeType.CONDITION){
                log.info("Adding non-condition node {}", targetNode.getNodeType());
                nextNodes.add(targetNode);
                continue;
            }
            log.info("Evaluating CONDITION node {}", targetNode.getId());
            BranchType branch = conditionExecutionService.execute(completedTask.getOutput(),targetNode);
            log.info("Branch selected: {}", branch);
            WorkflowEdge selectedEdge = workflowEdgeRepository
                    .findBySourceNodeAndBranchType(targetNode,branch)
                    .orElseThrow(() ->
                            new BusinessException(
                                    ErrorCode.CONDITION_BRANCH_NOT_FOUND
                            ));

            log.info("Selected target: {}",
                    selectedEdge.getTargetNode().getNodeType());
            nextNodes.add(selectedEdge.getTargetNode());

        }
        log.info("Returning next nodes: {}",
                nextNodes.stream()
                        .map(WorkflowNode::getNodeType)
                        .toList());
        return  nextNodes;
    }
}
