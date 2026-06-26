package com.flowforge.auth_service.common.exception;

import org.springframework.http.HttpStatus;

public class OrganizationAlreadyExistsException extends AuthServiceException {
    public OrganizationAlreadyExistsException(String message) {
        super(HttpStatus.CONFLICT, message);
    }
}
