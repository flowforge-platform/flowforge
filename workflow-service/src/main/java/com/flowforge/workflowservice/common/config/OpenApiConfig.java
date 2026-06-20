package com.flowforge.workflowservice.common.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI flowForgeOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("FlowForge Workflow Service")
                        .version("v1")
                        .description("Workflow Orchestration Platform APIs")
                        .contact(new Contact()
                                .name("FlowForge Team")
                                .email("team@flowforge.com")));
    }
}