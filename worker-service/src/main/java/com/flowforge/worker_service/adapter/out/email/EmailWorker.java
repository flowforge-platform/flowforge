package com.flowforge.worker_service.adapter.out.email;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.flowforge.worker_service.domain.model.WorkerResult;
import com.flowforge.worker_service.domain.model.WorkerTask;
import com.flowforge.worker_service.domain.worker.WorkerHandler;
import io.github.resilience4j.bulkhead.annotation.Bulkhead;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.client.circuitbreaker.CircuitBreaker;
import org.springframework.cloud.client.circuitbreaker.CircuitBreakerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EmailWorker implements WorkerHandler {

    private final ObjectMapper objectMapper;
    private final JavaMailSender mailSender;
   private final CircuitBreakerFactory circuitBreakerFactory;

    @Override
    public String getType() {
        return "EMAIL";
    }

    @Override
    @Bulkhead(name = "email",fallbackMethod = "emailFallback")
    public WorkerResult execute(WorkerTask task) {
        CircuitBreaker circuitBreaker=circuitBreakerFactory.create("email");
        return circuitBreaker.run(()->doExecute(task),throwable -> WorkerResult.failure(task.getId(), "Email unavailable: " + throwable.getMessage()));
    }
    private WorkerResult emailFallback(WorkerTask task,Throwable throwable){
        return WorkerResult.failure(task.getId(),"Email work overloaded, try again later ");
    }
    private WorkerResult doExecute(WorkerTask task){
        EmailConfig config=null;
        try {
            config = objectMapper.readValue(task.getPayload(), EmailConfig.class);
        }
        catch (Exception ex) {
            return WorkerResult.failure(task.getId(),"Invalid Email config"+ex.getMessage());
        }
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(config.to());
        message.setSubject(config.subject());
        message.setText(config.body());

        mailSender.send(message);
        return WorkerResult.success(task.getId(), "Email sent successfully");
    }
}
