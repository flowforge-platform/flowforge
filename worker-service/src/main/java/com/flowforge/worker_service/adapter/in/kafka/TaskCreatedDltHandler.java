package com.flowforge.worker_service.adapter.in.kafka;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.DltHandler;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class TaskCreatedDltHandler {
    @DltHandler
    @KafkaListener(topics = "task-created-dlt",groupId = "worker-group-dlt")
    public void handleDlt(String message, @Header(KafkaHeaders.RECEIVED_TOPIC) String topic,@Header(KafkaHeaders.EXCEPTION_MESSAGE) String exceptionMessage){

    }
}
