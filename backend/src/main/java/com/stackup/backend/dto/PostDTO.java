package com.stackup.backend.dto;

import java.sql.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.stackup.backend.entity.Post;
import com.stackup.backend.entity.Tag;

public record PostDTO(
    Long id,
    String title,
    String body,
    Date createdAt,
    
    String code,
    UserDTO user,
    
    Set<String> tags,
    List<CommentDTO> comments,
    Set<UserDTO> likedBy
){

    public static PostDTO noComments(Post p){
        return build(p, false);
    }
   
    public static PostDTO withCOmments(Post p){
        return build(p, true);
    }

    public static PostDTO build(Post p, Boolean withComments){
        return new PostDTO(
            p.getId(),
            p.getTitle(),
            p.getBody(),
            p.getCreatedAt(),
            p.getCode(),

            new UserDTO(
                p.getAuthor().getId(), 
                p.getAuthor().getUsername(),
                p.getAuthor().getEmail(),
                p.getAuthor().getPortfolio_url(),
                p.getAuthor().getBio(),
                p.getAuthor().getCreatedAt(),
                p.getAuthor().getAvatar()
            ),

            p.getTags().stream().map(Tag::getName).collect(Collectors.toSet()),
            withComments ? p.getComments().stream().map(CommentDTO::from).collect(Collectors.toList()) : null,
            p.getLikedBy().stream().map(UserDTO::from).collect(Collectors.toSet())
        );
    }
}
