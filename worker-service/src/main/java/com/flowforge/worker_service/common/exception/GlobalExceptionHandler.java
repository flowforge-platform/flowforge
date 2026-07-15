package com.flowforge.worker_service.common.exception;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(WorkerExecutionException.class)
    public String handleWorkerExecutionException(Exception ex){
        return ex.getMessage();
    }
}
