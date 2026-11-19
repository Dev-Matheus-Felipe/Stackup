package com.stackup.backend.service;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stackup.backend.dto.responses.UserMainProfileDTO;
import com.stackup.backend.dto.userDTOs.UserDTO;
import com.stackup.backend.dto.userDTOs.profile.ProfileCommentDTO;
import com.stackup.backend.dto.userDTOs.profile.ProfileMainInfo;
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

    public long calcReputation(long posts, long likes, long comentarios) {
        double media = (double) likes / Math.max(posts, 1);
        double confianca = Math.min(posts, 10) / 10.0;

        double score = 100 * Math.log1p(posts)
            + 50  * Math.log1p(likes)
            + 20  * Math.log1p(comentarios)
            + 30  * Math.log1p(media) * confianca;

        return Math.round(score);
    }

    public ResponseEntity<?> getProfileData(Long id){
        UserDTO user = UserDTO.from(userRepository
            .findById(id).orElseThrow(() -> new RuntimeException("user not found!")));

        // ---------------------------------------------------------- //

        List<ProfilePostDTO> top_posts = postRepository
            .findTopProfilePosts(id , PageRequest.of(0, 5));

        // ---------------------------------------------------------- //

        List<ProfileCommentDTO> top_comments = commentRepository
            .findTopProfileComments(id, PageRequest.of(0, 5));

        // ---------------------------------------------------------- //

        ProfileMainInfo data = userRepository.findDataCount(id);
        long reputation = calcReputation(data.PostsCount(), data.PostsLikes() + data.CommentsLikes(), data.CommentsCount());

        return  ResponseEntity.ok().body(Map.of("success", true, "data", new UserMainProfileDTO(user, top_posts, top_comments, data, reputation)));
    }


}
