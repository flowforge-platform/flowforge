package com.flowforge.worker_service.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DeadLetterTaskRepository extends JpaRepository<DeadLetterTaskEntity, UUID> {
}