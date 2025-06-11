package com.example.back.controller;

import com.example.back.dto.*;
import com.example.back.dto.auth.*;
import com.example.back.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@RequestBody RegisterRequest request) {
        try {
            UserDTO userDTO = authService.register(request.getUsername(), request.getPassword());
            return ResponseEntity.ok(new ApiResponse(true, "User registered successfully", userDTO));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ApiResponse(false, e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "An unexpected error occurred", null));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UserLoginResponse> login(@RequestBody LoginRequest request) {
        try {
            UserLoginResponse response = authService.login(request.getUsername(), request.getPassword());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace(); // or use logger
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @PostMapping("/profile/login")
    public ResponseEntity<ApiResponse> loginToProfile(@RequestBody ProfileLoginRequest request) {
        try {
            ProfileDTO profileDTO = authService.loginToProfile(request.getProfileId(), request.getUsername());
            return ResponseEntity.ok(new ApiResponse(true, "Profile login successful", profileDTO));
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Unexpected error", null));
        }
    }

    @PostMapping("/profile/logout")
    public ResponseEntity<ApiResponse> logoutProfile(@RequestBody ProfileLogoutRequest request) {
        try {
            authService.logoutProfile(request.getProfileId(), request.getUsername());
            return ResponseEntity.ok(new ApiResponse(true, "Profile logged out successfully", null));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Unexpected error", null));
        }
    }
}
