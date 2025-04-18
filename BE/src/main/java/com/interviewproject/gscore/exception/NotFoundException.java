package com.interviewproject.gscore.exception;

import org.springframework.http.HttpStatus;

public class NotFoundException extends ScoreException {
    public NotFoundException(String message) {
        super(message,
                "NOT_FOUND",
                HttpStatus.NOT_FOUND);
    }
}