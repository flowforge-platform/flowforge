package com.flowforge.worker_service.adapter.out.persistence;

import com.flowforge.worker_service.application.port.out.TaskRepositoryPort;
import com.flowforge.worker_service.domain.model.WorkerTask;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class TaskRepositoryAdapter implements TaskRepositoryPort {

    private final SpringDataWorkerTaskRepository springDataWorkerTaskRepository;
    @Override
    public WorkerTask save(WorkerTask task) {
        WorkerTaskEntity entity = WorkTaskMapper.toEntity(task);
        WorkerTaskEntity saved = springDataWorkerTaskRepository.save(entity);
        return WorkTaskMapper.toDomain(saved);
    }

    @Override
    public Optional<WorkerTask> findById(UUID id) {
        return springDataWorkerTaskRepository.findById(id)
                .map(WorkTaskMapper::toDomain);
    }
}
