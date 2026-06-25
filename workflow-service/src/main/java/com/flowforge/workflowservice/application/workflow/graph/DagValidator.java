package com.flowforge.workflowservice.application.workflow.graph;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.*;

/**
 * Detects cycles in workflow graphs using DFS.
 * A workflow must be a Directed Acyclic Graph (DAG)
 * before it can be published or executed.
 */
@Component
@Slf4j
public class DagValidator {
    public boolean hasCycle(Map<UUID, List<UUID>> graph){
        Set<UUID> visited = new HashSet<>();
        Set<UUID> visiting = new HashSet<>();

        for(UUID node : graph.keySet()){
            if(dfs(node,graph,visiting,visited)){
                return  true;
            }
        }
        return false;
    }

    private boolean dfs(UUID node,Map<UUID,List<UUID>> graph,Set<UUID> visiting,Set<UUID> visited){
        if (visiting.contains(node)){
            log.warn("Cycle detected in workflow graph at node {}", node);
            return  true;
        }
        if (visited.contains(node)){
            return  false;
        }

        visiting.add(node);

        for(UUID neighbour : graph.get(node)){
            if (dfs(neighbour,graph,visiting,visited)) {
                return true;
            }
        }
        visiting.remove(node);
        visited.add(node);
        return false;
    }
}
