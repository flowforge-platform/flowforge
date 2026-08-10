package com.flowforge.workflowservice.application.workflow.graph;

import com.flowforge.workflowservice.domain.edge.WorkflowEdge;
import com.flowforge.workflowservice.domain.node.WorkflowNode;
import org.openjdk.jmh.annotations.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.MILLISECONDS)
@Warmup(iterations = 3, time = 1)
@Measurement(iterations = 5, time = 1)
@Fork(1)
@State(Scope.Benchmark)
public class DagJmhBenchmark {

    private GraphBuilder graphBuilder;
    private DagValidator dagValidator;
    private TopologicalSorter topologicalSorter;

    @Param({"1000", "5000", "10000"})
    int nodeCount;

    private Map<UUID, List<UUID>> graph;

    @Setup(Level.Trial)
    public void setup() {

        graphBuilder = new GraphBuilder();
        dagValidator = new DagValidator();
        topologicalSorter = new TopologicalSorter();

        List<WorkflowNode> nodes = createNodes(nodeCount);
        List<WorkflowEdge> edges = createEdges(nodes);

        graph = graphBuilder.buildGraph(nodes, edges);
    }

    @Benchmark
    public boolean cycleDetection() {

        return dagValidator.hasCycle(graph);
    }

    @Benchmark
    public List<UUID> topologicalSort() {

        return topologicalSorter.sort(graph);
    }

    private List<WorkflowNode> createNodes(int count) {

        List<WorkflowNode> nodes = new ArrayList<>();

        for (int i = 0; i < count; i++) {

            WorkflowNode node = WorkflowNode.builder()
                    .id(UUID.randomUUID())
                    .build();

            nodes.add(node);
        }

        return nodes;
    }

    private List<WorkflowEdge> createEdges(
            List<WorkflowNode> nodes
    ) {

        List<WorkflowEdge> edges = new ArrayList<>();

        /*
         * Create a chain:
         *
         * 0 → 1 → 2 → 3 → ...
         */
        for (int i = 0; i < nodes.size() - 1; i++) {

            edges.add(
                    WorkflowEdge.builder()
                            .sourceNode(nodes.get(i))
                            .targetNode(nodes.get(i + 1))
                            .build()
            );
        }

        /*
         * Add forward edges.
         * Because edges always point forward,
         * the graph remains a DAG.
         */
        for (int i = 0;
             i < nodes.size() - 2;
             i++) {

            edges.add(
                    WorkflowEdge.builder()
                            .sourceNode(nodes.get(i))
                            .targetNode(nodes.get(i + 2))
                            .build()
            );
        }

        return edges;
    }

    public static void main(String[] args)
            throws Exception {

        org.openjdk.jmh.runner.options.Options options =
                new org.openjdk.jmh.runner.options.OptionsBuilder()
                        .include(
                                DagJmhBenchmark.class
                                        .getSimpleName()
                        )
                        .build();

        new org.openjdk.jmh.runner.Runner(options)
                .run();
    }
}