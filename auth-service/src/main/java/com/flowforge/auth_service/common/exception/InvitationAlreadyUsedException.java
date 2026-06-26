package com.flowforge.auth_service.common.exception;

import org.springframework.http.HttpStatus;

public class InvitationAlreadyUsedException extends AuthServiceException {
    public InvitationAlreadyUsedException(String message) {
        super(HttpStatus.GONE, message);
    }
}
