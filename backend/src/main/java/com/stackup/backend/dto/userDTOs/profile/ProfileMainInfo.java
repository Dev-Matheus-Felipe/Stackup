package com.stackup.backend.dto.userDTOs.profile;

public record ProfileMainInfo(
    Integer PostsCount,
    Long CommentsCount,

    Long PostsLikes,
    Long CommentsLikes
) {}
