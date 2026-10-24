package com.stackup.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import com.stackup.backend.dto.TagDTO;
import com.stackup.backend.entity.Tag;
import com.stackup.backend.repository.TagRepository;

@Service 
public class TagSevice {
    private final TagRepository tagRepository;

    public TagSevice(TagRepository tagRepository){
        this.tagRepository = tagRepository;
    }

    public List<TagDTO> getTops(Integer amount){
        Pageable pageable = PageRequest.of(0, 5);
        
        Slice<Tag> topTags = tagRepository.findTopTags(pageable);

        return topTags.stream().map(TagDTO::from).collect(Collectors.toList());
    }
}
