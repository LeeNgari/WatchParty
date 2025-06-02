package com.example.back.repository;

import com.example.back.models.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.Set;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Set<Profile> findByUserId(Long userId);
    Optional<Profile> findByIdAndUserId(Long profileId, Long userId);
}