package com.flowforge.workflowservice.domain.edge;
import com.flowforge.workflowservice.domain.node.WorkflowNode;
import com.flowforge.workflowservice.domain.workflow.Workflow;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "workflow_edges")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkflowEdge {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workflow_id", nullable = false)
    private Workflow workflow;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "source_node_id")
    private WorkflowNode sourceNode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "target_node_id")
    private WorkflowNode targetNode;

    @CreationTimestamp
    private Instant createdAt;
}