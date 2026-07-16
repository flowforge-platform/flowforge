package com.flowforge.worker_service.application.service;

import com.flowforge.worker_service.application.port.in.ExecuteTaskUseCase;
import com.flowforge.worker_service.application.port.out.EventPublisherPort;
import com.flowforge.worker_service.application.port.out.TaskRepositoryPort;
import com.flowforge.worker_service.application.registry.WorkerRegistry;
import com.flowforge.worker_service.domain.enums.TaskStatus;
import com.flowforge.worker_service.domain.model.WorkerResult;
import com.flowforge.worker_service.domain.model.WorkerTask;
import com.flowforge.worker_service.domain.worker.WorkerHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
@Slf4j
@Service
@RequiredArgsConstructor
public class TaskExecutorService implements ExecuteTaskUseCase {

    private final WorkerRegistry workerRegistry;
    private final TaskRepositoryPort taskRepositoryPort;
    private final EventPublisherPort eventPublisherPort;


    @Override
    public WorkerResult execute(WorkerTask task) {

        //idempotency check
        Optional<WorkerTask> existing = taskRepositoryPort.findById(task.getId());
        if (existing.isPresent() && existing.get().getStatus() == TaskStatus.SUCCESS) {
            log.info("Task {} already completed successfully, skipping duplicate execution", task.getId());
            return WorkerResult.success(task.getId(), "Already processed");
        }
        try {
            task.markRunning();
            taskRepositoryPort.save(task);

            WorkerHandler worker = workerRegistry.get(task.getType());
            WorkerResult result = worker.execute(task);

            if (result.isSuccess()) {
                task.markDone(result.getMessage());
            } else {
                task.markFailed(result.getMessage());
            }

            taskRepositoryPort.save(task);
            eventPublisherPort.publishTaskCompleted(task, result);
            return result;
        } catch (Exception exception) {
            task.markFailed(exception.getMessage());
            taskRepositoryPort.save(task);

            WorkerResult result = WorkerResult.failure(task.getId(), exception.getMessage());
            eventPublisherPort.publishTaskCompleted(task, result);
            return result;
        }
    }

}
