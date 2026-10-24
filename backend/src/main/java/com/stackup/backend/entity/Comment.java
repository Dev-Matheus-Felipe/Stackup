package com.stackup.backend.entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter 
@Table (name = "comments")
@Entity 
public class Comment {

  @Id 
  @GeneratedValue (strategy = GenerationType.IDENTITY)
  private Long id;

  @Column (name = "created_at")
  private Date createdAt;
  
  private Integer likes;

  @Column (nullable = false, length = 250)
  private String body;

  @ManyToOne 
  @JoinColumn (name = "author", nullable = false)
  private User author;

  @ManyToOne
  @JoinColumn (name = "post_id", nullable = false)
  private Post post;
}
