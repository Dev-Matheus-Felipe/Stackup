package com.stackup.backend.service;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import com.stackup.backend.interfaces.TagCount;
import com.stackup.backend.repository.TagRepository;

@Service 
public class TagSevice {
    private final TagRepository tagRepository;

    public TagSevice(TagRepository tagRepository){
        this.tagRepository = tagRepository;
    }

    public List<TagCount> getTops(Integer amount){
        Pageable pageable = PageRequest.of(0, amount);
        
        Slice<TagCount> topTags = tagRepository.findTopTags(pageable);

        return topTags.getContent();
    }
}
