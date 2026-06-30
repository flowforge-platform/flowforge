package com.flowforge.auth_service.service;

import com.flowforge.auth_service.model.Organization;
import com.flowforge.auth_service.repository.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrganizationService {
    private final OrganizationRepository organizationRepository;

    public Organization save(Organization organization){
        return organizationRepository.save(organization);
    }

    public Optional<Organization> findById(String id){
        return organizationRepository.findById(id);
    }

    public boolean existsByName(String name){
        return organizationRepository.existsByName(name);
    }
}
