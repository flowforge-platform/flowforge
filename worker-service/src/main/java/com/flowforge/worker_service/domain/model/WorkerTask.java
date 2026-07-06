package com.flowforge.worker_service.domain.model;

import com.flowforge.worker_service.domain.enums.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkerTask {
    private String id;
    private String workflowExecutionId;
    private String nodeId;
    private String type;
    private String payload;
    private TaskStatus status;
    private String result;
    private String error;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;



    public WorkerTask(String id, String workflowExecutionId, String nodeId, String type, String payload) {
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
        this.status = TaskStatus.DONE;
        this.result = result;
        this.updatedAt = LocalDateTime.now();
    }

    public void markFailed(String error) {
        this.status = TaskStatus.FAILED;
        this.error = error;
        this.updatedAt = LocalDateTime.now();
    }

}