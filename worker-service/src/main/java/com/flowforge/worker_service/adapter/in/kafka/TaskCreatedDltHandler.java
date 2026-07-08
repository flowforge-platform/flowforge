package com.flowforge.worker_service.adapter.in.kafka;

import com.flowforge.worker_service.adapter.out.persistence.DeadLetterTaskEntity;
import com.flowforge.worker_service.adapter.out.persistence.DeadLetterTaskRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.DltHandler;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
@Slf4j
public class TaskCreatedDltHandler {
    private final DeadLetterTaskRepository deadLetterTaskRepository;
    @DltHandler
    @KafkaListener(
            topics = "task-created-dlt",
            groupId = "worker-group-dlt"
    )
    public void handleDlt(String message, @Header(KafkaHeaders.RECEIVED_TOPIC) String topic, @Header(KafkaHeaders.EXCEPTION_MESSAGE) String exceptionMessage) {

        log.error("Task-created message sent to DLT from topic {}: {} | reason: {}",
                topic, message, exceptionMessage);

        DeadLetterTaskEntity entity = DeadLetterTaskEntity.builder()
                .originalTopic(topic)
                .taskPayload(message)
                .exceptionMessage(exceptionMessage)
                .failedAt(LocalDateTime.now())
                .build();
        deadLetterTaskRepository.save(entity);
    }
}