package com.flowforge.worker_service.common.exception;

public class NonRetryableException extends RuntimeException {
    public NonRetryableException(String message) {
        super(message);
    }

}
