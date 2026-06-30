package com.flowforge.auth_service.exception;

import org.springframework.http.HttpStatus;

public class InvitationExpiredException extends AuthServiceException {
    public InvitationExpiredException(String message) {
        super(HttpStatus.GONE, message);
    }
}
