package com.stackup.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackup.backend.dto.auth.LoginDTO;
import com.stackup.backend.dto.auth.RegisterDTO;
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
    public ResponseEntity<?> Login(@RequestBody LoginDTO user) {
        return authService.LoginUser(user);
    }

    @PostMapping("/register")
    public ResponseEntity<?> Register(@RequestBody RegisterDTO user) {        
        return authService.RegisterUser(user);
    }
    
}
