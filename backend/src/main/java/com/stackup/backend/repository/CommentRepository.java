package com.stackup.backend.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.stackup.backend.dto.userDTOs.profile.ProfileCommentDTO;
import com.stackup.backend.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    
    @Query ("""
        SELECT new com.stackup.backend.dto.userDTOs.profile.ProfileCommentDTO(
            c.id,
            c.body,
            c.createdAt,
            size(c.likedBy)
        ) 
        
        FROM Comment c WHERE c.author.id = :authorId 
        ORDER BY c.createdAt DESC, c.id DESC
    """)
    List<ProfileCommentDTO> findTopProfileComments(@Param("authorId") Long authorId, Pageable pageable);
}
