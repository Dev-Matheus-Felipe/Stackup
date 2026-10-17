package com.stackup.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "users")
@Getter 
@Setter 
@NoArgsConstructor 
@Entity 
public class User {

    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (unique = true)
    private String username;

    @Column (unique = true)
    private String email;

    private String password;

    public User(String username, String email, String password){
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
