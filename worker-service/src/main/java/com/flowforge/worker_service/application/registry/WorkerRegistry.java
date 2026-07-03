package com.flowforge.worker_service.application.registry;

import com.flowforge.worker_service.domain.worker.WorkerHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Component
@Slf4j
public class WorkerRegistry {
    private final Map<String, WorkerHandler> registry=new HashMap<>();

    public WorkerRegistry(List<WorkerHandler> handlers){
        handlers.forEach(workerHandler -> registry.put(workerHandler.getType(),workerHandler));
        log.info("Registered workers: {}", registry.keySet());
    }

    public  WorkerHandler get(String type){
        WorkerHandler handler=registry.get(type);
        if (Objects.isNull(handler)){
            throw new IllegalArgumentException("No worker for type: " + type);
        }
        return handler;
    }
}
