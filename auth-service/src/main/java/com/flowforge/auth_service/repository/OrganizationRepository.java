package com.flowforge.auth_service.repository;

import com.flowforge.auth_service.model.Organization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganizationRepository extends JpaRepository<Organization,String> {
    boolean existsByName(String name);
}
