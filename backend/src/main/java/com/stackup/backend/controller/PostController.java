package com.stackup.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stackup.backend.dto.responses.PostOverviewResponse;
import com.stackup.backend.service.PostService;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;

@RestController 
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService){
        this.postService = postService;
    }

    @GetMapping("/some")
    public ResponseEntity<?> getSomePosts(
        @AuthenticationPrincipal Jwt jwt,
        @RequestParam Integer amount, 
        @RequestParam(defaultValue = "0") Integer offset,
        @RequestParam(defaultValue = "false") Boolean tops
    ) {

        PostOverviewResponse res = postService.getPosts(amount, offset, tops, Long.parseLong(jwt.getSubject()));

        return ResponseEntity.ok().body(Map.of(
            "sucess", true, 
            "data", res.posts(), 
            "hasNext", res.hasNext()
        ));
    }
    
}