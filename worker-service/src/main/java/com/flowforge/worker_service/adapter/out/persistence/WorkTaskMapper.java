package com.flowforge.worker_service.adapter.out.persistence;


import com.flowforge.worker_service.domain.model.WorkerTask;

public class WorkTaskMapper {
    private WorkTaskMapper(){};

    public static WorkerTaskEntity toEntity(WorkerTask task){
        WorkerTaskEntity entity = new WorkerTaskEntity();
            entity.setId(task.getId());
                entity.setWorkflowExecutionId(task.getWorkflowExecutionId());
                entity.setNodeId(task.getNodeId());
                entity.setType(task.getType());
                entity.setPayload(task.getPayload());
                entity.setStatus(task.getStatus());
                entity.setResult(task.getResult());
                entity.setError(task.getError());
                entity.setCreatedAt(task.getCreatedAt());
                entity.setUpdatedAt(task.getUpdatedAt());
                return entity;            
    }

    public static WorkerTask toDomain(WorkerTaskEntity entity){
        WorkerTask workerTask=new WorkerTask();
                workerTask.setId(entity.getId());
                workerTask.setWorkflowExecutionId(entity.getWorkflowExecutionId());
                workerTask.setNodeId(entity.getNodeId());
                workerTask.setType(entity.getType());
                workerTask.setPayload(entity.getPayload());
                workerTask.setStatus(entity.getStatus());
                workerTask.setResult(entity.getResult());
                workerTask.setError(entity.getError());
                workerTask.setCreatedAt(entity.getCreatedAt());
                workerTask.setUpdatedAt(entity.getUpdatedAt());
                return workerTask;

    }
     
}