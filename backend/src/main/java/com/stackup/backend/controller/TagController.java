package com.stackup.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stackup.backend.dto.tagDTOs.TagCountDTO;
import com.stackup.backend.interfaces.TagCount;
import com.stackup.backend.service.TagSevice;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/tags") 
public class TagController {

    private final TagSevice tagSevice;

    public TagController(TagSevice tagSevice){
        this.tagSevice = tagSevice;
    }

    @GetMapping("/tops")
    public ResponseEntity<?> getTopTags(@RequestParam Integer amount) {
        List<TagCount> topTags = tagSevice.getTops(amount);

        return ResponseEntity.ok().body(Map.of("sucess", true, "data", topTags)); 
    }

    @GetMapping("/my-profile")
    public ResponseEntity<?> getMethodName(@AuthenticationPrincipal Jwt jwt) {
        Long userId = Long.parseLong(jwt.getSubject());
        List<TagCountDTO> tags = tagSevice.getProfileTags(userId);

        return ResponseEntity.ok().body(Map.of("success", true, "data", tags));
    }
    
    
}
