package com.flowforge.auth_service.common.exception;

import org.springframework.http.HttpStatus;

public class OrganizationNotFoundException extends AuthServiceException {
    public OrganizationNotFoundException(String message) {
        super(HttpStatus.NOT_FOUND, message);
    }
}
