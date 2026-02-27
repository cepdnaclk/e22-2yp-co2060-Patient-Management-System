package com.pms.backend.common.exception;


import lombok.Getter;
import org.springframework.http.HttpStatus;

// RuntimeException: does not need to be declared with "throws"
@Getter
public class AppException extends RuntimeException {

    private final HttpStatus status;

    public AppException(String message, HttpStatus status) {
        super(message);  // passes message to RuntimeException
        this.status = status;
    }

    // Static factory methods — convenient shorthand
    // Usage: throw AppException.conflict("Email already registered");
    public static AppException unauthorized(String msg) {
        return new AppException(msg, HttpStatus.UNAUTHORIZED); // HTTP 401
    }
    public static AppException conflict(String msg) {
        return new AppException(msg, HttpStatus.CONFLICT);     // HTTP 409
    }
    public static AppException notFound(String msg) {
        return new AppException(msg, HttpStatus.NOT_FOUND);    // HTTP 404
    }
    public static AppException forbidden(String msg) {
        return new AppException(msg, HttpStatus.FORBIDDEN);    // HTTP 403
    }
}
