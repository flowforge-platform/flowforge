package com.flowforge.auth_service.exception;

import org.springframework.http.HttpStatus;

public class EmailMismatchException extends AuthServiceException {
    public EmailMismatchException(String message) {
        super(HttpStatus.BAD_REQUEST, message);
    }
}
