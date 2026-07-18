package com.flowforge.worker_service.adapter.out.kafka;

import com.flowforge.worker_service.application.port.out.EventPublisherPort;
import com.flowforge.worker_service.domain.model.WorkerResult;
import com.flowforge.worker_service.domain.model.WorkerTask;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
@Slf4j
public class KafkaEventPublisherAdapter implements EventPublisherPort {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Override
    public void publishTaskCompleted(WorkerTask task, WorkerResult result) {
        if(result.isSuccess()){
            TaskSucceededEvent event=new TaskSucceededEvent(
                    task.getWorkflowExecutionId(),
                    task.getId(),
                    task.getNodeId(),
                    task.getType(),
                    task.getStatus(),
                    result.getMessage(),
                    task.getUpdatedAt()
            );
            log.info("Publishing task-succeeded event for task {}", task.getId());
            kafkaTemplate.send(KafkaTopics.TASK_SUCCEEDED, task.getId().toString(), event);
        }else{
            TaskFailedEvent event=new TaskFailedEvent(
                    task.getWorkflowExecutionId(),
                    task.getId(),
                    task.getNodeId(),
                    task.getType(),
                    task.getStatus(),
                    result.getMessage(),
                    task.getUpdatedAt()
            );
            log.info("Publishing task-failed event for task {}", task.getId());
            kafkaTemplate.send(KafkaTopics.TASK_FAILED, task.getId().toString(), event);

        }
    }
}
