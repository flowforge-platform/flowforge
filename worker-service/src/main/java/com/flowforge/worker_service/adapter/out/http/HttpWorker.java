package com.flowforge.worker_service.adapter.out.http;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.flowforge.worker_service.domain.model.WorkerResult;
import com.flowforge.worker_service.domain.model.WorkerTask;
import com.flowforge.worker_service.domain.worker.WorkerHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class HttpWorker implements WorkerHandler {

    private final ObjectMapper objectMapper;
    private final RestTemplate restTemplate;

    @Override
    public String getType() {
        return "HTTP";
    }

    @Override
    public WorkerResult execute(WorkerTask task) {
        try {
            HttpConfig config = objectMapper.readValue(task.getPayload(), HttpConfig.class);

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
                return WorkerResult.failure(task.getId(), "HTTP call failed: " + response.getStatusCode());
            }

        } catch (Exception exception) {
            return WorkerResult.failure(task.getId(), exception.getMessage());
        }
    }
}