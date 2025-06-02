package com.example.back.controller;

import com.example.back.dto.*;
import com.example.back.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        authService.register(request.getUsername(), request.getPassword());
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String token = authService.login(request.getUsername(), request.getPassword());
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/profile/login")
    public ResponseEntity<?> loginToProfile(@RequestBody ProfileLoginRequest request) {
        String token = authService.loginToProfile(request.getProfileId(), request.getUsername());
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/profile/logout")
    public ResponseEntity<?> logoutProfile(@RequestBody ProfileLogoutRequest request) {
        authService.logoutProfile(request.getProfileId(), request.getUsername());
        return ResponseEntity.ok("Profile logged out successfully");
    }
}
