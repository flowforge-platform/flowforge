package com.flowforge.worker_service.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkerResult {
    private String taskId;
    private boolean success;
    private String message;
    public static WorkerResult success(String taskId, String message){
        return new WorkerResult(taskId,true,message);
    }
    public static WorkerResult failure(String taskId, String error) {
        return new WorkerResult(taskId, false, error);
    }


}
