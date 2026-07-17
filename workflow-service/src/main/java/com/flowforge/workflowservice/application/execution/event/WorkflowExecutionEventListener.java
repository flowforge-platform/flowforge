package com.flowforge.workflowservice.application.execution.event;

import com.flowforge.workflowservice.application.execution.engine.ExecutionEngine;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class WorkflowExecutionEventListener {
    private final ExecutionEngine executionEngine;

    @KafkaListener(
            topics = "task-succeeded",
            groupId = "workflow-service"
    )
    public void consumeTaskCompleted(TaskSucceededEvent event) {

        log.info(
                "Received task-completed event for task {}",
                event.taskExecutionId()
        );

        executionEngine.handleTaskCompleted(event);
    }

    @KafkaListener(
            topics = "task-failed",
            groupId = "workflow-service"
    )
    public void consumeTaskFailed(TaskFailedEvent event){
        log.info(
                "Received task-failed event for task {}",
                event.taskExecutionId()
        );

        executionEngine.handleTaskFailed(event);
    }

}
