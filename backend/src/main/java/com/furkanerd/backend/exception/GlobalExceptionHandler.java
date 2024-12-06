package com.furkanerd.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(GeneralException.class)
    public ResponseEntity<ErrorMessage> handleExceptions(GeneralException generalException){
        return new ResponseEntity<>(new ErrorMessage(generalException.getMessage()), HttpStatus.BAD_REQUEST);
    }
}
