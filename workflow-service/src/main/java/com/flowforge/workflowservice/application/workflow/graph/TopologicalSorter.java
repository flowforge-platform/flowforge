package com.flowforge.workflowservice.application.workflow.graph;

import com.flowforge.workflowservice.common.exception.BusinessException;
import com.flowforge.workflowservice.common.exception.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.*;

/**
 * Performs topological sorting using Kahn's Algorithm.
 * Produces a valid execution order for workflow nodes in a DAG.
 * Nodes are returned only after all their dependencies have been processed.
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
@Component
@Slf4j
public class TopologicalSorter {
    public List<UUID> sort(Map<UUID,List<UUID>> graph){

        Map<UUID,Integer> inDegree = new HashMap<>();

        for (UUID node : graph.keySet()) {
            inDegree.put(node, 0);
        }

        // Calculate incoming edge count for each node.
        for(UUID node : graph.keySet()){
            for (UUID neighbour : graph.getOrDefault(node,Collections.emptyList())){
                inDegree.put(
                   neighbour,
                   inDegree.get(neighbour)+1
                );
            }
        }

        // Enqueue nodes that have no dependencies.
        Queue<UUID> queue = new ArrayDeque<>();

        for (UUID node : inDegree.keySet()) {
            if (inDegree.get(node) == 0) {
                queue.offer(node);
            }
        }

        List<UUID> result = new ArrayList<>();

        // Process nodes in dependency order.
        while (!queue.isEmpty()){
           UUID current = queue.poll();
           result.add(current);
            // Reduce dependency count of neighbouring nodes.
            for(UUID neighbour : graph.getOrDefault(current,Collections.emptyList())){
                inDegree.put(
                        neighbour,
                        inDegree.get(neighbour)-1
                );
                // Node becomes executable once all dependencies are resolved.
                if (inDegree.get(neighbour) == 0) {
                    queue.offer(neighbour);
                }
            }
        }


        if(result.size() != graph.size()) {
            log.error("Topological sort failed due to cycle in workflow graph");
            throw new BusinessException(ErrorCode.WORKFLOW_CYCLE_DETECTED);
        }

      return result;
    }
}
