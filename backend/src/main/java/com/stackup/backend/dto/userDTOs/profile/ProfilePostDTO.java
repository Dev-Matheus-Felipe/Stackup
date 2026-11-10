package com.stackup.backend.dto.userDTOs.profile;

import java.sql.Date;

public record ProfilePostDTO(
    Long id,
    String title,
    Date createdAt,

    Integer responses
) {}
