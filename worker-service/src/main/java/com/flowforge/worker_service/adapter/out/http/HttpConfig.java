package com.flowforge.worker_service.adapter.out.http;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;

public record HttpConfig(
        @JsonProperty("endpoint")
        @JsonAlias("url")
        String endpoint,
        String method,
        Map<String, String> headers,
        String body
) {

}

