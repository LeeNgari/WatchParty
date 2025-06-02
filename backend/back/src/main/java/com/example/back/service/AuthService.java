package com.example.back.service;

import com.example.back.models.Profile;
import com.example.back.models.User;
import com.example.back.repository.ProfileRepository;
import com.example.back.repository.UserRepository;
import com.example.back.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public void register(String username, String password) {
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Username is already taken");
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }

    public String login(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Return token without profile selection
        return jwtUtils.generateToken(username, null);
    }

    public String loginToProfile(Long profileId, String username) {
        Profile profile = profileRepository.findByIdAndUserId(profileId,
                        userRepository.findByUsername(username).getId())
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        if (profile.isActive()) {
            throw new RuntimeException("Profile is already in use");
        }

        profile.setActive(true);
        String token = jwtUtils.generateToken(username, profileId);
        profile.setCurrentSessionToken(token);
        profileRepository.save(profile);

        return token;
    }

    public void logoutProfile(Long profileId, String username) {
        Profile profile = profileRepository.findByIdAndUserId(profileId,
                        userRepository.findByUsername(username).getId())
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        profile.setActive(false);
        profile.setCurrentSessionToken(null);
        profileRepository.save(profile);
    }
}