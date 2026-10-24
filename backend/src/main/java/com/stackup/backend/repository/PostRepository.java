package com.stackup.backend.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import com.stackup.backend.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long> {

    Slice<Post> findAllByOrderByLikesDesc(Pageable pageable);

    Slice<Post> findAllByOrderByCreatedAtDesc(Pageable pageable);

}
