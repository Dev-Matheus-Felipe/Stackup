package com.stackup.backend.service;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stackup.backend.dto.postDTOs.PostOverviewDTO;
import com.stackup.backend.dto.responses.PostOverviewResponse;
import com.stackup.backend.interfaces.PostsTags;
import com.stackup.backend.repository.PostRepository;


@Service 
public class PostService {

    private final PostRepository postRepository;
    private final TagSevice tagSevice;

    public PostService(PostRepository postRepository, TagSevice tagSevice){
        this.postRepository = postRepository;
        this.tagSevice = tagSevice;
    }

    @Transactional(readOnly = true)
    public PostOverviewResponse getPosts(Integer amount, Integer offset, Boolean tops, Long userId){

        Slice<PostOverviewDTO> posts = postRepository.findByOrder(userId, tops ? "likes" : "createdAt", PageRequest.of(offset, amount));
        List<Long> ids = posts.getContent().stream().map(PostOverviewDTO::id).collect(Collectors.toList());

        Map<Long, Set<String>> tags = ids.isEmpty()
            ? Map.of()
            : tagSevice.getPostTags(ids).stream().collect(
                Collectors.groupingBy(PostsTags::getPostId, Collectors.mapping(PostsTags::getTagName, Collectors.toSet()))
            );
        
        List<PostOverviewDTO> finalPosts = posts.getContent()
            .stream()
            .map(p -> p.withTags(tags.getOrDefault(p.id(), Set.of())))
            .collect(Collectors.toList());
        
        return new PostOverviewResponse(finalPosts, posts.hasNext());
    }

}
