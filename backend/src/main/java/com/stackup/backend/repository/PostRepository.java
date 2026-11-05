package com.stackup.backend.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.stackup.backend.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Query (
        """
            SELECT p FROM Post p
            ORDER BY size(p.likedBy) DESC, p.title ASC, p.id ASC
        """
    )
    Slice<Post> findAllByLikesDesc(Pageable pageable);

    Slice<Post> findAllByOrderByCreatedAtDesc(Pageable pageable);

    @Query (
        """
            SELECT p FROM Post p 
            WHERE p.author.id = :id
            ORDER BY size(p.likedBy) DESC, p.title ASC, p.id ASC
        """
    )
    Slice<Post> findTopPostsUser(@Param("id") Long id, Pageable pageable);

}
