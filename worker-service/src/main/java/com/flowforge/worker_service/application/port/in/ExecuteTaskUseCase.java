package com.flowforge.worker_service.application.port.in;

import com.flowforge.worker_service.domain.model.WorkerResult;
import com.flowforge.worker_service.domain.model.WorkerTask;

public interface ExecuteTaskUseCase {
    WorkerResult execute(WorkerTask task);
}
