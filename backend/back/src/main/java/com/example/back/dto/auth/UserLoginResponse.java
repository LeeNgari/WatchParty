package com.example.back.dto.auth;

import java.util.List;

public record UserLoginResponse(
    UserDTO user,
    List<ProfileDTO> profiles,
    String token
){}
