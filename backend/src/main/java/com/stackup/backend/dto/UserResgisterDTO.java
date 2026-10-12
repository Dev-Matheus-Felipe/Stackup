package com.stackup.backend.dto;

public record UserResgisterDTO(
    String username,
    String email,
    String password
) {}
