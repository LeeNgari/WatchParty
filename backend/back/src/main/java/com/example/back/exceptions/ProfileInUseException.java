package com.example.back.exceptions;

public class ProfileInUseException extends RuntimeException {
    public ProfileInUseException(String message) {
        super(message);
    }
}

