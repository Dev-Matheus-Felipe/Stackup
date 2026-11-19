package com.stackup.backend.dto.tagDTOs;

public record TagCountDTO(
    Long id,
    String name,
    Long count,
    
    String description,
    String css_color,
    String css_bg
) {}
