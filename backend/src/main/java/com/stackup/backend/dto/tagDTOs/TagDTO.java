package com.stackup.backend.dto.tagDTOs;

import com.stackup.backend.entity.Tag;

public record TagDTO(
    Long id,
    String name,
    String description,
    String css_color,
    String css_bg
) { 

    public static TagDTO from(Tag t){
        return new TagDTO(t.getId(), t.getName(), t.getDescription(), t.getCss_bg(), t.getCss_bg());
    }

}
