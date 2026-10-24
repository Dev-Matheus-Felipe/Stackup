package com.stackup.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stackup.backend.dto.TagDTO;
import com.stackup.backend.service.TagSevice;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
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
        List<TagDTO> topTags = tagSevice.getTops(amount);

        return ResponseEntity.ok().body(Map.of("sucess", true, "data", topTags)); 
    }
    
}
