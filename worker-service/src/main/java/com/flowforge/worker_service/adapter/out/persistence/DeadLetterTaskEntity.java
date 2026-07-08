package com.flowforge.worker_service.adapter.out.persistence;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "dead_letter_tasks")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DeadLetterTaskEntity {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "original_topic", nullable = false)
    private String originalTopic;

    @Column(name = "task_payload", columnDefinition = "TEXT", nullable = false)
    private String taskPayload;

    @Column(name = "exception_message", columnDefinition = "TEXT")
    private String exceptionMessage;

    @Column(name = "failed_at", nullable = false)
    private LocalDateTime failedAt;
}
