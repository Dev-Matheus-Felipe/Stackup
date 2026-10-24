package com.stackup.backend.dto;

public record RegisterDTO(
    String username,
    String email,
    String password
) {}
