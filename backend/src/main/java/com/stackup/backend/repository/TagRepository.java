package com.stackup.backend.repository;

import java.util.Set;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.stackup.backend.entity.Tag;

public interface TagRepository  extends JpaRepository<Tag, Long> {
    
    @Query (
        """
            SELECT t FROM Tag t
            LEFT JOIN t.posts
            GROUP BY t
            ORDER BY COUNT(p) DESC
        """
    )
    Set<Tag> findTopTags(Pageable pageable);
}
