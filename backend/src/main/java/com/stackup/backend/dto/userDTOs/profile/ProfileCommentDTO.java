package com.stackup.backend.dto.userDTOs.profile;

import java.sql.Date;

public record ProfileCommentDTO(
    Long id,
    String body,
    Date createdAt,
    Integer likes
) {}
