package com.stackup.backend.entity;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter 
@Table (name = "posts")
@Entity 
public class Post {

  @Id 
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column (nullable = false, length = 100)
  private String title;

  @Column (nullable = false, length = 250)
  private String body;

  private Integer likes;

  @Column(name = "created_at")
  private Date createdAt;

  @Column (length = 1000)
  private String code;

  @ManyToOne
  @JoinColumn (name = "user_id", nullable = false)
  private User user;

  @OneToMany(mappedBy = "post")
  private List<Comment> comments = new ArrayList<Comment>();

  @ManyToMany
  @JoinTable (
    name = "posts_tags",
    joinColumns = @JoinColumn(name = "post_id", nullable = false),
    inverseJoinColumns = @JoinColumn (name = "tag_id", nullable = false)
  )
  private Set<Tag> tags = new HashSet<Tag>();

}
