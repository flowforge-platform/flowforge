package com.flowforge.workflowservice.application.workflow.graph;

import com.flowforge.workflowservice.domain.edge.WorkflowEdge;
import com.flowforge.workflowservice.domain.node.WorkflowNode;
import org.springframework.stereotype.Component;
import java.util.*;

@Component
public class GraphBuilder {
    public Map<UUID, List<UUID>> buildGraph(
            List<WorkflowNode> nodes,
            List<WorkflowEdge> edges){

        Map<UUID,List<UUID>> graph = new HashMap<>();

        for(WorkflowNode node : nodes){
            graph.put(node.getId(),new ArrayList<>());
        }

        for(WorkflowEdge edge : edges){
            UUID sourceId = edge.getSourceNode().getId();
            UUID targetId = edge.getTargetNode().getId();

            graph.get(sourceId).add(targetId);
        }
        return graph;
    }
}
