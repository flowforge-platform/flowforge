package com.flowforge.worker_service.common.exception;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(WorkerExecutionException.class)
    public String handleWorkerExecutionException(Exception ex){
        return ex.getMessage();
    }
    @ExceptionHandler(NonRetryableException.class)
    public String handleNonRetryableExecutionException(Exception ex){
        return ex.getMessage();
    }
    @ExceptionHandler(SlackApiException.class)
    public String handleSlackApiException(Exception ex){
        return ex.getMessage();
    }

}
