package com.example.back.dto.auth;

import lombok.Data;

@Data
public class ProfileLoginRequest {
    private Long profileId;
    private String username;
    // getters and setters
}
