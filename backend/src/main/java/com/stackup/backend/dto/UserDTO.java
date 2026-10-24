package com.stackup.backend.dto;

import java.sql.Date;

public record UserDTO(
    Long id,
    String username,
    String email,
    String portfolio_url,
    String bio,
    Date created_at,
    String avatar
) {}
