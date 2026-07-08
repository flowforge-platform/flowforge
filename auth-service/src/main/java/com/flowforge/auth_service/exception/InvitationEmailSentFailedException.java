package com.flowforge.auth_service.exception;

public class InvitationEmailSentFailedException extends RuntimeException {
    public InvitationEmailSentFailedException(String message) {
        super(message);
    }
}
