package com.flowforge.worker_service.domain.model;

import com.flowforge.worker_service.domain.enums.TaskStatus;
import java.time.LocalDateTime;

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

    public WorkerTask() {}

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

    public String getId() { return id; }
    public String getWorkflowExecutionId() { return workflowExecutionId; }
    public String getNodeId() { return nodeId; }
    public String getType() { return type; }
    public String getPayload() { return payload; }
    public TaskStatus getStatus() { return status; }
    public String getResult() { return result; }
    public String getError() { return error; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public void setId(String id) { this.id = id; }
    public void setWorkflowExecutionId(String workflowExecutionId) { this.workflowExecutionId = workflowExecutionId; }
    public void setNodeId(String nodeId) { this.nodeId = nodeId; }
    public void setType(String type) { this.type = type; }
    public void setPayload(String payload) { this.payload = payload; }
    public void setStatus(TaskStatus status) { this.status = status; }
    public void setResult(String result) { this.result = result; }
    public void setError(String error) { this.error = error; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}