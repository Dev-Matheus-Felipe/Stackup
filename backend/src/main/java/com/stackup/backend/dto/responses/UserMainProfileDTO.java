package com.stackup.backend.dto.responses;

import java.util.List;

import com.stackup.backend.dto.userDTOs.UserDTO;
import com.stackup.backend.dto.userDTOs.profile.ProfileCommentDTO;
import com.stackup.backend.dto.userDTOs.profile.ProfilePostDTO;

public record UserMainProfileDTO(
    UserDTO user,
    List<ProfilePostDTO> topPosts,
    List<ProfileCommentDTO> topComments,
    Integer totalLikes
) {}
