package com.stackup.backend.dto;

import java.sql.Date;
import java.util.Set;
import java.util.stream.Collectors;

import com.stackup.backend.dto.userDTOs.UserDTO;
import com.stackup.backend.entity.Comment;

public record CommentDTO(
    Long id,
    Date createdAt,
    Set<UserDTO> likedBy,
    String body,
    UserDTO author
) {

    public static CommentDTO from(Comment c){
        return new CommentDTO(
            c.getId(), 
            c.getCreatedAt(), 
            c.getLikedBy().stream().map(UserDTO::from).collect(Collectors.toSet()),
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
