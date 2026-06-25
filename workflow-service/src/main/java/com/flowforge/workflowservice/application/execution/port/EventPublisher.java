package com.flowforge.workflowservice.application.execution.port;

import com.flowforge.workflowservice.application.execution.event.TaskCreatedEvent;

public interface EventPublisher {
    void publishTaskCreated(TaskCreatedEvent event);
}
