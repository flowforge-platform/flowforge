package com.flowforge.auth_service.exception;

import org.springframework.http.HttpStatus;

public class InvalidInviteTokenException extends AuthServiceException {
    public InvalidInviteTokenException(String message) {
        super(HttpStatus.NOT_FOUND, message);
    }
}
