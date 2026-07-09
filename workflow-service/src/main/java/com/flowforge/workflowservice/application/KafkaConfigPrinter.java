package com.flowforge.workflowservice.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class KafkaConfigPrinter implements CommandLineRunner {

    @Autowired
    private Environment environment;

    @Override
    public void run(String... args) {
        System.out.println("bootstrap = "
                + environment.getProperty("spring.kafka.bootstrap-servers"));

        System.out.println("consumer = "
                + environment.getProperty("spring.kafka.consumer.bootstrap-servers"));

        System.out.println("producer = "
                + environment.getProperty("spring.kafka.producer.bootstrap-servers"));
    }
}