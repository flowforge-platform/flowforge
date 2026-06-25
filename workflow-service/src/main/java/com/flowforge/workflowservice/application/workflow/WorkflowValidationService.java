package com.flowforge.workflowservice.application.workflow;

import com.flowforge.workflowservice.application.workflow.graph.DagValidator;
import com.flowforge.workflowservice.application.workflow.graph.GraphBuilder;
import com.flowforge.workflowservice.common.exception.BusinessException;
import com.flowforge.workflowservice.common.exception.ErrorCode;
import com.flowforge.workflowservice.domain.edge.WorkflowEdge;
import com.flowforge.workflowservice.domain.node.NodeType;
import com.flowforge.workflowservice.domain.node.WorkflowNode;
import com.flowforge.workflowservice.infrastructure.persistence.WorkflowEdgeRepository;
import com.flowforge.workflowservice.infrastructure.persistence.WorkflowNodeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class WorkflowValidationService {
    private final WorkflowNodeRepository workflowNodeRepository;
    private final WorkflowEdgeRepository workflowEdgeRepository;
    private final GraphBuilder graphBuilder;
    private final DagValidator dagValidator;
    public  void  validate(UUID workflowId){

        List<WorkflowNode> nodes = workflowNodeRepository.findByWorkflow_Id(workflowId);
        List<WorkflowEdge> edges = workflowEdgeRepository.findByWorkflow_Id(workflowId);

        validateNodesExists(nodes);

        validateStartNode(nodes);

        validateEndNode(nodes);

        // Ensure workflow graph is a valid DAG
        validateCycle(nodes,edges);
    }

    private void validateNodesExists(List<WorkflowNode> nodes){
        if(nodes.isEmpty()){
            throw new BusinessException(ErrorCode.WORKFLOW_HAS_NO_NODES);
        }
    }

    private void validateStartNode(List<WorkflowNode> nodes){
        long startCount = nodes
                .stream()
                .filter(node->node.getNodeType()==NodeType.START)
                .count();

        if(startCount==0){
            log.warn("Workflow validation failed: missing START node");
            throw new BusinessException(ErrorCode.WORKFLOW_MISSING_START_NODE);
        }

        if(startCount>1){
            throw new BusinessException(ErrorCode.WORKFLOW_MULTIPLE_START_NODES);
        }
    }

    private void validateEndNode(List<WorkflowNode> nodes){

        long endCount = nodes
                .stream()
                .filter(node->node.getNodeType()==NodeType.END)
                .count();

        if(endCount==0){
            log.warn("Workflow validation failed: missing END node");
            throw new BusinessException(ErrorCode.WORKFLOW_MISSING_END_NODE);
        }

        if(endCount>1){
            throw new BusinessException(ErrorCode.WORKFLOW_MULTIPLE_END_NODES);
        }
    }

    // Reject workflows containing cycles
    private void validateCycle(List<WorkflowNode> nodes,List<WorkflowEdge> edges){
        // Convert workflow definition into graph representation
        Map<UUID,List<UUID>> graph = graphBuilder.buildGraph(nodes,edges);
        // Reject workflows containing cycles
        if(dagValidator.hasCycle(graph)){
            throw new BusinessException(ErrorCode.WORKFLOW_CYCLE_DETECTED);
        }
    }
}
