package com.stackup.backend.dto.postDTOs;

import java.sql.Date;
import java.util.Set;

import com.stackup.backend.dto.userDTOs.UserOverviewDTO;
import com.stackup.backend.entity.Post;

public record PostOverviewDTO(
    Long id,
    String title,
    String body,
    Date createdAt,
    
    UserOverviewDTO user,
    
    Set<String> tags,

    Integer commentsCount,
    Integer likes,
    boolean iLiked
){


    public static PostOverviewDTO build(
        Post p, 
        Integer commentsCount, 
        Integer likedBy,
        Set<String> tags,
        boolean iLiked
    ){

        return new PostOverviewDTO(
            p.getId(),
            p.getTitle(),
            p.getBody(),
            p.getCreatedAt(),

            new UserOverviewDTO(
                p.getAuthor().getId(), 
                p.getAuthor().getUsername(),
                p.getAuthor().getAvatar()
            ),

            tags,
            commentsCount,
            likedBy,
            iLiked
        );
    }

    public PostOverviewDTO withTags(Set<String> tags) {
        return new PostOverviewDTO(
            id, title, body, createdAt, user, tags,
            commentsCount, likes, iLiked
        );
    }
}
