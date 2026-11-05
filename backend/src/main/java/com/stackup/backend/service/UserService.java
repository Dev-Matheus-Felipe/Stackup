package com.stackup.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.stackup.backend.dto.PostDTO;
import com.stackup.backend.repository.UserRepository;

@Service 
public class UserService {
    private final UserRepository userRepository;
    private final PostService postService;

    public UserService(UserRepository userRepository, PostService postService){
        this.userRepository = userRepository;
        this.postService = postService;
    }

    public String getUserProfileData(Long id){
        List<PostDTO> posts = postService.getUserTopPosts(id, 5);
        return "ok";
    }
}
