package com.example.back.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProfileDTO {
        private Long id;
        private String name;
        private boolean isActive;


}
