package com.stackup.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stackup.backend.dto.PostDTO;
import com.stackup.backend.service.PostService;
import java.util.Map;

import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@RestController 
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService){
        this.postService = postService;
    }

    @GetMapping("/some")
    public ResponseEntity<?> getHome(
        @RequestParam Integer amount, 
        @RequestParam(defaultValue = "0") Integer offset,
        @RequestParam(defaultValue = "false") Boolean tops
    ) {

        Slice<PostDTO> posts = postService.getPosts(amount, offset, tops);

        return ResponseEntity.ok().body(Map.of("sucess", true, "data", posts.getContent(), "hasNext", posts.hasNext()));
    }
    
}