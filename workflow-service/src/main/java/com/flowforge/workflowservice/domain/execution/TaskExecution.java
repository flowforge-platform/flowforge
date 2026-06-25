package com.flowforge.workflowservice.domain.execution;
import com.flowforge.workflowservice.domain.node.WorkflowNode;
import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "task_executions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskExecution {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "workflow_execution_id",
            nullable = false
    )
    private WorkflowExecution workflowExecution;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "node_id",
            nullable = false
    )
    private WorkflowNode node;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskExecutionStatus status;

    private Instant startedAt;

    private Instant completedAt;

    @Column(nullable = false)
    @Builder.Default
    private Integer retryCount = 0;

    private String errorMessage;
}