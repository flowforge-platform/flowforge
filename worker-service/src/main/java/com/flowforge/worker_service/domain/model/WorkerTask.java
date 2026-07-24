package com.flowforge.worker_service.domain.model;

import com.flowforge.worker_service.domain.enums.TaskStatus;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkerTask {
    private UUID id;
    private UUID workflowExecutionId;
    private UUID nodeId;
    private String type;
    private String payload;
    private TaskStatus status;
    private String result;
    private String error;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;



    public WorkerTask(UUID id, UUID workflowExecutionId, UUID nodeId, String type, String payload) {
        this.id = id;
        this.workflowExecutionId = workflowExecutionId;
        this.nodeId = nodeId;
        this.type = type;
        this.payload = payload;
        this.status = TaskStatus.PENDING;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public void markRunning() {
        this.status = TaskStatus.RUNNING;
        this.updatedAt = LocalDateTime.now();
    }

    public void markDone(String result) {
        this.status = TaskStatus.SUCCESS;
        this.result = result;
        this.updatedAt = LocalDateTime.now();
    }

    public void markFailed(String error) {
        this.status = TaskStatus.FAILED;
        this.error = error;
        this.updatedAt = LocalDateTime.now();
    }

}