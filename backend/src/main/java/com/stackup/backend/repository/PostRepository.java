package com.stackup.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.stackup.backend.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
    

}
