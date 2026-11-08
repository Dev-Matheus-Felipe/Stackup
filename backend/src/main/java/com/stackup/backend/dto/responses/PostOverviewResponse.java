package com.stackup.backend.dto.responses;

import java.util.List;

import com.stackup.backend.dto.postDTOs.PostOverviewDTO;

public record PostOverviewResponse(
    List<PostOverviewDTO> posts,
    boolean hasNext
) {}
