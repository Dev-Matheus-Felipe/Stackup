package com.stackup.backend.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.stackup.backend.entity.Tag;
import com.stackup.backend.interfaces.TagCount;


public interface TagRepository  extends JpaRepository<Tag, Long> {
    
    @Query (
        """
            SELECT t.id AS id, t.name AS name, COUNT(p) AS total FROM Tag t
            LEFT JOIN t.posts p
            GROUP BY t
            ORDER BY COUNT(p) DESC, t.name DESC
        """
    )
    Slice<TagCount> findTopTags(Pageable pageable);
}
