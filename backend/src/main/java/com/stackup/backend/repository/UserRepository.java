package com.stackup.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.stackup.backend.dto.userDTOs.profile.ProfileMainInfo;
import com.stackup.backend.entity.User;


public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Query("""
        SELECT new com.stackup.backend.dto.userDTOs.profile.ProfileMainInfo(
            size(u.posts),

            (SELECT COUNT(c) FROM Comment c WHERE c.author.id = :userId),
            (SELECT COUNT(likes) FROM Post p  JOIN p.likedBy likes WHERE p.author.id = :userId),
            (SELECT COUNT(likes) FROM Comment c JOIN c.likedBy likes WHERE c.author.id = :userId)

        ) FROM User u WHERE u.id = :userId
    """)
    ProfileMainInfo findDataCount(@Param ("userId") Long userId);

}
