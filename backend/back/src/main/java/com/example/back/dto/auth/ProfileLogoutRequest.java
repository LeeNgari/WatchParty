package com.example.back.dto.auth;

import lombok.Data;

@Data
public class ProfileLogoutRequest {
    private Long profileId;
    private String username;
    // getters and setters
}