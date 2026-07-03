package com.flowforge.worker_service.application.port.out;

import com.flowforge.worker_service.domain.model.WorkerTask;

import java.util.Optional;

public interface TaskRepositoryPort {
    WorkerTask save(WorkerTask task);

    Optional<WorkerTask> findById(String id);

}
