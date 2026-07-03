package com.flowforge.worker_service.application.port.out;

import com.flowforge.worker_service.domain.model.WorkerResult;
import com.flowforge.worker_service.domain.model.WorkerTask;

public interface EventPublisherPort {
    void publishTaskCompleted(WorkerTask task, WorkerResult result);
}
