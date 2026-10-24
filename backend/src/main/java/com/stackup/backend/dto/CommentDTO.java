package com.stackup.backend.dto;

import java.sql.Date;

import com.stackup.backend.entity.Comment;

public record CommentDTO(
    Long id,
    Date created_at,
    Integer likes,
    String body,
    UserDTO author
) {

    public static CommentDTO from(Comment c){
        return new CommentDTO(
            c.getId(), 
            c.getCreatedAt(), 
            c.getLikes(), 
            c.getBody(), 

            new UserDTO(
                c.getAuthor().getId(), 
                c.getAuthor().getUsername(),
                c.getAuthor().getEmail(),
                c.getAuthor().getPortfolio_url(),
                c.getAuthor().getBio(),
                c.getAuthor().getCreatedAt(),
                c.getAuthor().getAvatar()
            )
        );
    }
}
