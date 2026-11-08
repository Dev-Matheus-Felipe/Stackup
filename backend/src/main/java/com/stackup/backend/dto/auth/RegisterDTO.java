package com.stackup.backend.dto.auth;

public record RegisterDTO(
    String username,
    String email,
    String password
) {}
