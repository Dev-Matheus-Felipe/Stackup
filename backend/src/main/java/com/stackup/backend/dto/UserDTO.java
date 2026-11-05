package com.stackup.backend.dto;

import java.sql.Date;

import com.stackup.backend.entity.User;

public record UserDTO(
    Long id,
    String username,
    String email,
    String portfolio_url,
    String bio,
    Date createdAt,
    String avatar
) {
    public static UserDTO from(User u){
        return  new UserDTO(
            u.getId(),
            u.getUsername(),
            u.getEmail(),
            u.getPortfolio_url(),
            u.getBio(),
            u.getCreatedAt(),
            u.getAvatar()
        );
    }
}
