package com.stackup.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stackup.backend.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {

}
