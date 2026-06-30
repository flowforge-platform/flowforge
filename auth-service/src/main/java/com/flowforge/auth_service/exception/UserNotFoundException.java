package com.flowforge.auth_service.exception;

import org.springframework.http.HttpStatus;

public class UserNotFoundException extends AuthServiceException {
    public UserNotFoundException(String message) {
        super(HttpStatus.NOT_FOUND, message);
    }
}
