package com.stackup.backend.service;

import java.util.List;
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

    public ResponseEntity<?> getHomePosts(Integer amount, Integer offset){
        Slice<Post> posts = postRepository.findAll(PageRequest.of(offset, amount));
        
        return ResponseEntity.ok().body(Map.of("sucess", true, "data", posts, "hasNext", posts.hasNext()));
    }
    
    public ResponseEntity<?> getTops(Integer amount){
        List<Post> posts = postRepository.findAllByOrderByLikesDesc(PageRequest.of(0, amount));
        
        return ResponseEntity.ok().body(Map.of("sucess", true, "data", posts));
    }
}
