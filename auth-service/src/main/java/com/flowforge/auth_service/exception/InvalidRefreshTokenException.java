package com.flowforge.auth_service.exception;

import org.springframework.http.HttpStatus;

public class InvalidRefreshTokenException extends AuthServiceException {
    public InvalidRefreshTokenException(String message) {
        super(HttpStatus.UNAUTHORIZED, message);
    }
}
