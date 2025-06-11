package com.example.back.service;

import com.example.back.dto.auth.ProfileDTO;
import com.example.back.dto.auth.UserDTO;
import com.example.back.dto.auth.UserLoginResponse;
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
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public UserDTO register(String username, String password) {
        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Username '" + username + "' is already taken.");
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        User savedUser = userRepository.save(user);

        // Create and save a default profile
        Profile defaultProfile = new Profile();
        defaultProfile.setName("john");
        defaultProfile.setUser(savedUser);
        defaultProfile.setActive(false);
        profileRepository.save(defaultProfile);


        return new UserDTO(savedUser.getId(), savedUser.getUsername());
    }

    public UserLoginResponse login(String username, String password) {
        // Authenticate user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Get user from authentication (already loaded by UserDetailsService)
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername());
        if (user == null) {
            throw new IllegalArgumentException("User not found.");
        }

        // Fetch profiles
        Set<Profile> profileSet = profileRepository.findByUserId(user.getId());
        List<Profile> profiles = new ArrayList<>(profileSet);
        List<ProfileDTO> profileDTOs = profiles.stream()
                .map(profile -> new ProfileDTO(
                        profile.getId(),
                        profile.getName(),
                        profile.isActive()
                ))
                .collect(Collectors.toList());

        // Generate token
        String userToken = jwtUtils.generateToken(username, null);

        return new UserLoginResponse(
                new UserDTO(user.getId(), user.getUsername()),
                profileDTOs,
                userToken
        );
    }

    public ProfileDTO loginToProfile(Long profileId, String username) {
        Optional<User> userOptional = Optional.ofNullable(userRepository.findByUsername(username));
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User not found.");
        }

        Long userId = userOptional.get().getId();
        Profile profile = profileRepository.findByIdAndUserId(profileId, userId)
                .orElseThrow(() -> new IllegalArgumentException("Profile not found or does not belong to user."));

        if (profile.isActive()) {
            throw new IllegalStateException("Profile is already in use.");
        }

        profile.setActive(true);
        String token = jwtUtils.generateToken(username, profileId);
        profile.setCurrentSessionToken(token);
        profileRepository.save(profile);

        return new ProfileDTO(profile.getId(), profile.getName(), profile.isActive());
    }

    public void logoutProfile(Long profileId, String username) {
        Optional<User> userOptional = Optional.ofNullable(userRepository.findByUsername(username));
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("User not found.");
        }

        Long userId = userOptional.get().getId();
        Profile profile = profileRepository.findByIdAndUserId(profileId, userId)
                .orElseThrow(() -> new IllegalArgumentException("Profile not found or does not belong to user."));

        profile.setActive(false);
        profile.setCurrentSessionToken(null);
        profileRepository.save(profile);
    }
}
