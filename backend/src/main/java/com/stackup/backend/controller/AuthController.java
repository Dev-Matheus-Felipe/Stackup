package com.stackup.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackup.backend.dto.UserLoginDTO;
import com.stackup.backend.dto.UserResgisterDTO;
import com.stackup.backend.service.AuthService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController 
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> Login(@RequestBody UserLoginDTO user) {
        return authService.LoginUser(user);
    }

    @PostMapping("/register")
    public ResponseEntity<?> Register(@RequestBody UserResgisterDTO user) {        
        return authService.RegisterUser(user);
    }
    
}
