package com.flowforge.workflowservice.infrastructure.kafka;

import com.flowforge.workflowservice.application.execution.event.TaskCreatedEvent;
import com.flowforge.workflowservice.application.execution.port.EventPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaPublisher implements EventPublisher {
    private final KafkaTemplate<String,Object> kafkaTemplate;

    @Override
    public void publishTaskCreated(TaskCreatedEvent event) {
        log.info(
                "Publishing task-created event for task {}",
                event.taskExecutionId()
        );
        kafkaTemplate.send(
                KafkaTopics.TASK_CREATED,
                event)
                .whenComplete((result, ex) -> {

            if (ex != null) {
                log.error("Failed to publish task-created", ex);
                return;
            }

            log.info(
                    "Published task-created to partition={} offset={}",
                    result.getRecordMetadata().partition(),
                    result.getRecordMetadata().offset()
            );
        });
    }
}
