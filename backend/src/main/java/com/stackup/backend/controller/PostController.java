package com.stackup.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stackup.backend.service.PostService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@RestController 
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService){
        this.postService = postService;
    }

    @GetMapping("/home")
    public ResponseEntity<?> getHome(@RequestParam Integer amount, @RequestParam(defaultValue = "0") Integer offset) {
        return postService.getHomePosts(amount, offset);
    }

    @GetMapping("/tops")
    public ResponseEntity<?> getTops(@RequestParam Integer amount) {
        return postService.getTops(amount);
    }
    
    
}
