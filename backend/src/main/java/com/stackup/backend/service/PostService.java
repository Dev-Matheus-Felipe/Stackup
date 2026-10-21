package com.stackup.backend.service;

import java.util.Map;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stackup.backend.entity.Post;
import com.stackup.backend.repository.PostRepository;

@Service 
public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository){
        this.postRepository = postRepository;
    }


    public ResponseEntity<?> getHomePosts(Integer offset){
        Pageable pageable = PageRequest.of(offset, 10);

        Slice<Post> posts = postRepository.findAll(pageable);

        return ResponseEntity.ok().body(Map.of("sucess", true, "data", posts, "hasNext", posts.hasNext()));
    }
}
