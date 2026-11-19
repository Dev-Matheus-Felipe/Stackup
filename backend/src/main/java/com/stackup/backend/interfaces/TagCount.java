package com.stackup.backend.interfaces;

public interface TagCount {
    Long getId();
    String getName();
    Long getTotal();
    
    String getDescription();
    String getCss_color();
    String getCss_bg();
}