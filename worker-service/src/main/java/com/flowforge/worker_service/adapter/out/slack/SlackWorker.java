package com.flowforge.worker_service.adapter.out.slack;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.flowforge.worker_service.common.exception.SlackApiException;
import com.flowforge.worker_service.domain.model.WorkerResult;
import com.flowforge.worker_service.domain.model.WorkerTask;
import com.flowforge.worker_service.domain.worker.WorkerHandler;
import io.github.resilience4j.bulkhead.annotation.Bulkhead;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.circuitbreaker.CircuitBreaker;
import org.springframework.cloud.client.circuitbreaker.CircuitBreakerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class SlackWorker implements WorkerHandler {
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final CircuitBreakerFactory circuitBreakerFactory;


    @Value("${slack.bot.token}")
    private String botToken;

    private static final String SLACK_POST_MESSAGE_URL = "https://slack.com/api/chat.postMessage";

    @Override
    public String getType() {
        return "SLACK";
    }

    @Override
    @Bulkhead(name = "slack", fallbackMethod = "slackFallback")
    public WorkerResult execute(WorkerTask task) {
        CircuitBreaker circuitBreaker = circuitBreakerFactory.create("slack");
        return circuitBreaker.run(() -> doExecute(task),throwable ->WorkerResult.failure(task.getId(), "Slack unavailable: " + throwable.getMessage()));
    }
    private WorkerResult slackFallback(WorkerTask task,Throwable throwable){
        return WorkerResult.failure(task.getId(), "Slack worker overloaded, try again later");
    }

    private WorkerResult doExecute(WorkerTask task){
        SlackConfig config=null;
        try {
            config = objectMapper.readValue(task.getPayload(), SlackConfig.class);
        }catch (Exception ex){
            return WorkerResult.failure(task.getId(), "Invalid Slack config: " + ex.getMessage());
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(botToken);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = Map.of(
                "channel", config.channel(),
                "text", config.message()
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        Map response = restTemplate.postForObject(SLACK_POST_MESSAGE_URL, request, Map.class);

        if (response != null && Boolean.FALSE.equals(response.get("ok"))) {
            throw new SlackApiException("Slack API error: " + response.get("error"));
        }

        return WorkerResult.success(task.getId(), "Slack message sent successfully");
        }

}
