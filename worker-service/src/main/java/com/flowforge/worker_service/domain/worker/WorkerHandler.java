package com.flowforge.worker_service.domain.worker;

import com.flowforge.worker_service.domain.model.WorkerResult;
import com.flowforge.worker_service.domain.model.WorkerTask;

public interface WorkerHandler {

    String getType();

    WorkerResult execute(WorkerTask task);
}
