package com.stackup.backend.dto;

import com.stackup.backend.entity.Tag;

public record TagDTO(
    Long id,
    String name
) { 

    public static TagDTO from(Tag t){
        return new TagDTO(t.getId(), t.getName());
    }

}
