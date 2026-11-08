package com.stackup.backend.service;

import org.springframework.stereotype.Service;

import com.stackup.backend.repository.UserRepository;

@Service 
public class UserService {
    private final UserRepository userRepository;
    private final PostService postService;

    public UserService(UserRepository userRepository, PostService postService){
        this.userRepository = userRepository;
        this.postService = postService;
    }


}
