package com.flowforge.worker_service.adapter.in.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.flowforge.worker_service.application.port.in.ExecuteTaskUseCase;
import com.flowforge.worker_service.common.exception.WorkerExecutionException;
import com.flowforge.worker_service.domain.model.WorkerResult;
import com.flowforge.worker_service.domain.model.WorkerTask;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.annotation.RetryableTopic;
import org.springframework.kafka.retrytopic.TopicSuffixingStrategy;
import org.springframework.retry.annotation.Backoff;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class TaskCreatedConsumer {

    private final ExecuteTaskUseCase executeTaskUseCase;
    private final ObjectMapper objectMapper;

    @RetryableTopic(
            attempts = "3",
            backoff = @Backoff(delay = 1000, multiplier = 2),
            autoCreateTopics = "true",
            topicSuffixingStrategy = TopicSuffixingStrategy.SUFFIX_WITH_INDEX_VALUE,
            include = { WorkerExecutionException.class }
    )
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
        WorkerResult result = executeTaskUseCase.execute(task);

        if (!result.isSuccess()) {
            log.warn("Task {} failed on this attempt: {}", task.getId(), result.getMessage());
            throw new WorkerExecutionException("Task " + task.getId() + " failed: " + result.getMessage());
        }
    }
}
