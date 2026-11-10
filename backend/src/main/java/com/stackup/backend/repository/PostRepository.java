package com.stackup.backend.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.stackup.backend.entity.Post;
import com.stackup.backend.dto.postDTOs.PostOverviewDTO;
import com.stackup.backend.dto.userDTOs.profile.ProfilePostDTO;


public interface PostRepository extends JpaRepository<Post, Long> {

    @Query ("""
        SELECT new com.stackup.backend.dto.postDTOs.PostOverviewDTO(
            p.id,
            p.title,
            p.body,
            p.createdAt,
            
            new com.stackup.backend.dto.userDTOs.UserOverviewDTO(
                a.id,
                a.username,
                a.avatar
            ),

            null,
            size(p.comments),
            size(p.likedBy),

            CASE WHEN EXISTS (
                SELECT 1 FROM p.likedBy u WHERE u.id = :currentUserId
            ) THEN true ELSE false END
        ) 
            
        FROM Post p 
        JOIN p.author a 

        ORDER BY 
            CASE WHEN :orderBy = 'likes' THEN size(p.likedBy) END DESC, 
            p.createdAt DESC
    """)
    Slice<PostOverviewDTO> findByOrder(@Param ("currentUserId") Long currentUserId, @Param ("orderBy") String orderBy, Pageable pageable);


    Integer countByAuthor_Id(Long id);


    @Query ("""
        SELECT new com.stackup.backend.dto.userDTOs.profile.ProfilePostDTO(
            p.id,
            p.title,
            p.createdAt,
            size(p.comments)
        ) 
        
        FROM Post p WHERE p.author.id = :authorId 
        ORDER BY p.createdAt DESC, p.id DESC
    """)
    List<ProfilePostDTO> findTopProfilePosts(@Param ("authorId") Long authorId, Pageable pageable);

}

