package com.example.back.dto.auth;

import lombok.Data;

@Data

public class RegisterRequest {
    private String username;
    private String password;
    // getters and setters
}