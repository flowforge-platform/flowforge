package com.flowforge.auth_service.repository;

import com.flowforge.auth_service.model.Organization;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface OrganizationRepository extends JpaRepository<Organization,UUID> {
    boolean existsByName(String name);
}
