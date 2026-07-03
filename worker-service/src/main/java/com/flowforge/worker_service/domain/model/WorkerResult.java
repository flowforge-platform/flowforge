package com.flowforge.worker_service.domain.model;

public class WorkerResult {
    private String taskId;
    private boolean success;
    private String message;
    public WorkerResult(){}

    private WorkerResult(String taskId,boolean success,String message){
        this.taskId=taskId;
        this.success=success;
        this.message=message;
    }

    public static WorkerResult success(String taskId, String message){
        return new WorkerResult(taskId,true,message);
    }
    public static WorkerResult failure(String taskId, String error) {
        return new WorkerResult(taskId, false, error);
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
