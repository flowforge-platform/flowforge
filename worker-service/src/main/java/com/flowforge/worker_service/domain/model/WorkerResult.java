package com.flowforge.worker_service.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkerResult {
    private UUID taskId;
    private boolean success;
    private String message;
    public static WorkerResult success(UUID taskId, String message){
        return new WorkerResult(taskId,true,message);
    }
    public static WorkerResult failure(UUID taskId, String error) {
        return new WorkerResult(taskId, false, error);
    }


}
