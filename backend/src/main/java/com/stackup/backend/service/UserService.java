package com.stackup.backend.service;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stackup.backend.dto.responses.UserMainProfileDTO;
import com.stackup.backend.dto.userDTOs.UserDTO;
import com.stackup.backend.dto.userDTOs.profile.ProfileCommentDTO;
import com.stackup.backend.dto.userDTOs.profile.ProfilePostDTO;
import com.stackup.backend.repository.CommentRepository;
import com.stackup.backend.repository.PostRepository;
import com.stackup.backend.repository.UserRepository;

@Service 
public class UserService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    public UserService(UserRepository userRepository, PostRepository postRepository, CommentRepository commentRepository){
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }

    public ResponseEntity<UserMainProfileDTO> getProfileData(Long id){
        UserDTO user = UserDTO.from(userRepository
            .findById(id).orElseThrow(() -> new RuntimeException("user not found!")));

        // ---------------------------------------------------------- //

        List<ProfilePostDTO> top_posts = postRepository
            .findTopProfilePosts(id , PageRequest.of(0, 3));

        Integer posts_count = postRepository.countByAuthor_Id(id);

        // ---------------------------------------------------------- //

        List<ProfileCommentDTO> top_comments = commentRepository
            .findTopProfileComments(id, PageRequest.of(0, 3));

        Integer comments_count = commentRepository.countByAuthor_Id(id);

        // ---------------------------------------------------------- //

        return  ResponseEntity.ok().body(new UserMainProfileDTO(user, top_posts, top_comments, posts_count + comments_count));
    }


}
