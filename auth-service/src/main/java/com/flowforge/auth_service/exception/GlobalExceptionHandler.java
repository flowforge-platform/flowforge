package com.flowforge.auth_service.exception;

import com.flowforge.auth_service.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;


import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(OrganizationAlreadyExistsException.class)
    public ApiResponse<Void> handleOrganizationAlreadyExists(Exception ex) {
        return ApiResponse.error(ex.getMessage());
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ApiResponse<Void> handleEmailAlreadyExists(Exception ex) {
        return ApiResponse.error(ex.getMessage());
    }

    @ExceptionHandler(InvalidInviteTokenException.class)
    public ApiResponse<Void> handleInvalidInviteToken(Exception ex) {
        return ApiResponse.error(ex.getMessage());
    }

    @ExceptionHandler(EmailMismatchException.class)
    public ApiResponse<Void> handleEmailMismatch(Exception ex) {
        return ApiResponse.error(ex.getMessage());
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ApiResponse<Void> handleInvalidCredentials(Exception ex) {
        return ApiResponse.error(ex.getMessage());
    }

    @ExceptionHandler(InvalidRefreshTokenException.class)
    public ApiResponse<Void> handleInvalidRefreshToken(Exception ex) {
        return ApiResponse.error(ex.getMessage());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ApiResponse<Void> handleUserNotFound(Exception ex) {
        return ApiResponse.error(ex.getMessage());
    }

    @ExceptionHandler(InvitationAlreadyUsedException.class)
    public ApiResponse<Void> handleInvitationAlreadyUsed(Exception ex) {
        return ApiResponse.error(ex.getMessage());
    }

    @ExceptionHandler(InvitationExpiredException.class)
    public ApiResponse<Void> handleInvitationExpired(Exception ex) {
        return ApiResponse.error(ex.getMessage());
    }

    @ExceptionHandler(OrganizationNotFoundException.class)
    public ApiResponse<Void> handleOrganizationNotFound(Exception ex) {
        return ApiResponse.error(ex.getMessage());
    }
    @ExceptionHandler(InvitationEmailSentFailedException.class)
    public ApiResponse<Void> handleInvitationEmailSentFailed(Exception ex) {
        return ApiResponse.error(ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponse<Void> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ApiResponse.error("Validation failed", errors);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiResponse<Void> handleGeneralException(Exception ex) {
        return ApiResponse.error(ex.getMessage() != null ? ex.getMessage() : "An unexpected error occurred");
    }
}
