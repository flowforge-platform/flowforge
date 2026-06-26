package com.flowforge.auth_service.common.exception;

import org.springframework.http.HttpStatus;

public class EmailAlreadyExistsException extends AuthServiceException {
    public EmailAlreadyExistsException(String message) {
        super(HttpStatus.CONFLICT, message);
    }
}
