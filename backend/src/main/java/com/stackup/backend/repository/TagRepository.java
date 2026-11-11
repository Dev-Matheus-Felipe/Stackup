package com.stackup.backend.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.stackup.backend.dto.tagDTOs.TagCountDTO;
import com.stackup.backend.entity.Tag;
import com.stackup.backend.interfaces.PostsTags;
import com.stackup.backend.interfaces.TagCount;


public interface TagRepository  extends JpaRepository<Tag, Long> {
    
    @Query ("""
        SELECT t.id AS id, t.name AS name, COUNT(p) AS total FROM Tag t
        LEFT JOIN t.posts p
        GROUP BY t
        ORDER BY COUNT(p) DESC, t.name DESC
    """)
    Slice<TagCount> findTopTags(Pageable pageable);

    @Query ("""
        SELECT p.id as postId, t.name as tagName FROM Post p
        JOIN p.tags t
        WHERE p.id IN :postIds
    """)
    List<PostsTags> findAllInPostIds(@Param("postIds") List<Long> postIds);


    @Query("""
        SELECT new com.stackup.backend.dto.tagDTOs.TagCountDTO(
            t.id,
            t.name,
            count(p)
        ) 
        
        FROM Tag t JOIN t.posts p
        WHERE p.author.id = :userId
        GROUP BY t.id, t.name
        ORDER BY COUNT(p) DESC, t.name DESC
    """)
    List<TagCountDTO> findUserTopTags(@Param("userId") Long userId);
    
}
