package com.stackup.backend.dto.auth;

public record LoginDTO(
    String email,
    String password
) {}
