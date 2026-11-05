package com.stackup.backend.entity;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
  
  @Column (nullable = false, length = 250)
  private String body;

  @ManyToOne 
  @JoinColumn (name = "author", nullable = false)
  private User author;

  @ManyToOne
  @JoinColumn (name = "post_id", nullable = false)
  private Post post;


  @ManyToMany 
  @JoinTable (
    name = "comments_likes",
    joinColumns = @JoinColumn (name = "comment_id", nullable = false),
    inverseJoinColumns = @JoinColumn (name = "user_id", nullable = false)
  )
  private Set<User> likedBy = new HashSet<User>(); 
}
