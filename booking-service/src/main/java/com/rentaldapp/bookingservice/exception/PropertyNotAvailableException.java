package com.rentaldapp.bookingservice.exception;

public class PropertyNotAvailableException extends RuntimeException {
    public PropertyNotAvailableException(String message) {
        super(message);
    }
}