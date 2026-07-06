package com.flowforge.worker_service.adapter.in.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.flowforge.worker_service.application.port.in.ExecuteTaskUseCase;
import com.flowforge.worker_service.domain.model.WorkerTask;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class TaskCreatedConsumer {

    private final ExecuteTaskUseCase executeTaskUseCase;
    private final ObjectMapper objectMapper;

    @KafkaListener(
            topics = "task-created",
            groupId = "worker-group",
            containerFactory = "kafkaListenerContainerFactory"
    )
    public void consume(String message) throws JsonProcessingException {
        TaskCreatedEvent event = objectMapper.readValue(message, TaskCreatedEvent.class);
        String payload = event.configuration() == null
                ? "{}"
                : objectMapper.writeValueAsString(event.configuration());

        WorkerTask task = new WorkerTask(
                event.taskExecutionId(),
                event.workflowExecutionId(),
                event.nodeId(),
                event.nodeType(),
                payload
        );

        log.info("Received task-created event for task {} of type {}", task.getId(), task.getType());
        executeTaskUseCase.execute(task);
    }
}
