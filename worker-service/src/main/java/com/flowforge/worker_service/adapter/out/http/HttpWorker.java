package com.flowforge.worker_service.adapter.out.http;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.flowforge.worker_service.common.exception.HttpTargetException;
import com.flowforge.worker_service.domain.model.WorkerResult;
import com.flowforge.worker_service.domain.model.WorkerTask;
import com.flowforge.worker_service.domain.worker.WorkerHandler;
import io.github.resilience4j.bulkhead.annotation.Bulkhead;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.client.circuitbreaker.CircuitBreaker;
import org.springframework.cloud.client.circuitbreaker.CircuitBreakerFactory;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class HttpWorker implements WorkerHandler {

    private final ObjectMapper objectMapper;
    private final RestTemplate restTemplate;
    private final CircuitBreakerFactory circuitBreakerFactory;

    @Override
    public String getType() {
        return "HTTP";
    }

    @Override
    @Bulkhead(name = "http",fallbackMethod = "httpFallback")
    public WorkerResult execute(WorkerTask task) {
        CircuitBreaker circuitBreaker = circuitBreakerFactory.create("http");
        return circuitBreaker.run(()->doExecute(task),throwable ->  WorkerResult.failure(task.getId(),"HTTP unavailable"+throwable.getMessage()));
    }
    private WorkerResult httpFallback(WorkerTask workerTask,Throwable throwable){
        return WorkerResult.failure(workerTask.getId(),"http-worker overloaded, try again later");
    }
    private WorkerResult doExecute(WorkerTask task) {
        HttpConfig config=null;
        try {
            config = objectMapper.readValue(task.getPayload(), HttpConfig.class);
        }catch (Exception exception) {
            return WorkerResult.failure(task.getId(), exception.getMessage());
        }
        HttpHeaders headers = new HttpHeaders();
        if (config.headers() != null) {
            config.headers().forEach(headers::add);
        }

        HttpEntity<String> requestEntity = new HttpEntity<>(config.body(), headers);
        HttpMethod method = HttpMethod.valueOf(config.method().toUpperCase());

        ResponseEntity<String> response = restTemplate.exchange(
                config.url(), method, requestEntity, String.class
        );

        if (response.getStatusCode().is2xxSuccessful()) {
            return WorkerResult.success(task.getId(), "HTTP call succeeded: " + response.getStatusCode());
        } else {
            throw new HttpTargetException("HTTP call failed: " + response.getStatusCode());
        }

    }
}