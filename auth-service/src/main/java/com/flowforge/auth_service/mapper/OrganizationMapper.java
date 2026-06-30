package com.flowforge.auth_service.mapper;

import com.flowforge.auth_service.dto.RegisterOrgRequest;
import com.flowforge.auth_service.model.Organization;
import org.springframework.stereotype.Component;

@Component
public class OrganizationMapper {
    public Organization toEntity(RegisterOrgRequest request) {
        Organization org = new Organization();
        org.setName(request.getOrganizationName());
        return org;
    }
}
