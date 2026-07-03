package com.flowforge.worker_service.adapter.out.email;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.flowforge.worker_service.domain.model.WorkerResult;
import com.flowforge.worker_service.domain.model.WorkerTask;
import com.flowforge.worker_service.domain.worker.WorkerHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EmailWorker implements WorkerHandler {

    private final ObjectMapper objectMapper;
    private final JavaMailSender mailSender;

    @Override
    public String getType() {
        return "EMAIL";
    }

    @Override
    public WorkerResult execute(WorkerTask task) {
        try {
            EmailConfig config = objectMapper.readValue(task.getPayload(), EmailConfig.class);

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(config.to());
            message.setSubject(config.subject());
            message.setText(config.body());

            mailSender.send(message);
            return WorkerResult.success(task.getId(), "Email sent successfully");
        } catch (Exception exception) {
            return WorkerResult.failure(task.getId(), exception.getMessage());
        }
    }
}
