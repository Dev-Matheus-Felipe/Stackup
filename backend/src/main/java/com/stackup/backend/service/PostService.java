package com.stackup.backend.service;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stackup.backend.dto.PostDTO;
import com.stackup.backend.entity.Post;
import com.stackup.backend.repository.PostRepository;


@Service 
public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository){
        this.postRepository = postRepository;
    }

    @Transactional(readOnly = true)
    public Slice<PostDTO> getPosts(Integer amount, Integer offset, Boolean tops){

        Slice<Post> posts = !tops
            ? postRepository.findAllByOrderByCreatedAtDesc(PageRequest.of(offset, amount))
            : postRepository.findAllByOrderByLikesDesc(PageRequest.of(0, amount));
        
        return posts.map(PostDTO::noComments);
    }
}
