package com.stackup.backend.service;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.stackup.backend.dto.UserLoginDTO;
import com.stackup.backend.dto.UserResgisterDTO;
import com.stackup.backend.entity.User;
import com.stackup.backend.repository.UserRepository;

@Service 
public class AuthService {
    private final UserRepository userRepository;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, TokenService tokenService){
        this.userRepository = userRepository;
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity<?> RegisterUser(UserResgisterDTO user){
        User userDB = userRepository.findByEmail(user.email()).orElse(null);
        
        if(userDB != null){
            return ResponseEntity.badRequest().body(Map.of("sucess", false, "message", "User already exists!"));
        }

        String encryptedPassword = passwordEncoder.encode(user.password());

        try {
            userRepository.save( new User(user.username(), user.email(), encryptedPassword) );
            String token = tokenService.createToken(user.email());

            return ResponseEntity.ok().body(Map.of("sucess", true, "token", token, "message", "created sucessfully."));

        } catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("sucess", false, "message", e.getMessage()));
        }

    }


    public ResponseEntity<?> LoginUser(UserLoginDTO user){
        User userDB = userRepository.findByEmail(user.email()).orElse(null);

        if(userDB.equals(null) || !passwordEncoder.matches(user.password(), userDB.getPassword())){
            return ResponseEntity.badRequest().body(Map.of("sucess", false, "message", "Invalid credentials!"));
        }

        String token = tokenService.createToken(user.email());

        return ResponseEntity.ok().body(Map.of("sucess", true, "token", token, "message", "logged sucessfully."));
    }
}
