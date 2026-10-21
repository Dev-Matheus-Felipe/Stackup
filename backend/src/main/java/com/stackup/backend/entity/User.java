package com.stackup.backend.entity;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter 
@Table(name = "users")
@Entity 
public class User {

    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (unique = true, length = 20, nullable = false)
    private String username;

    @Column (unique = true, length = 250, nullable = false)
    private String email;

    @Column (length = 250, nullable = false)
    private String password;
    
    @Column (length = 300)
    private String portfolio_url;
    
    @Column (length = 500)
    private String bio;
    
    private Date created_at;
    
    @Column (length = 500, nullable = false)
    private String avatar;

    @OneToMany(mappedBy = "user")
    private List<Post> posts = new ArrayList<>();

    public User(String username, String email, String password){
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
