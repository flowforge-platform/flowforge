package com.flowforge.auth_service.common.exception;

import org.springframework.http.HttpStatus;

public class InvalidCredentialsException extends AuthServiceException {
    public InvalidCredentialsException(String message) {
        super(HttpStatus.UNAUTHORIZED, message);
    }
}
