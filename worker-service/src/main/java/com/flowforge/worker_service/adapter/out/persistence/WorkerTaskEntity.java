package com.flowforge.worker_service.adapter.out.persistence;


import java.time.LocalDateTime;
import java.util.UUID;

import com.flowforge.worker_service.domain.enums.TaskStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "worker_tasks")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkerTaskEntity {


    @Id
    private UUID id;

    @Column(name = "workflow_execution_id")
    private UUID workflowExecutionId;

    @Column(name = "node_id")
    private UUID nodeId;

    @Column(nullable = false)
    private String type;

    @Column(columnDefinition = "TEXT")
    private String payload;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskStatus status;

    @Column(columnDefinition = "TEXT")
    private String result;

    @Column(columnDefinition = "TEXT")
    private String error;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


}
