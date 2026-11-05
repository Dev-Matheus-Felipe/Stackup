ALTER TABLE posts DROP COLUMN likes;
ALTER TABLE comments DROP COLUMN likes;

CREATE TABLE posts_likes(
    post_id BIGINT REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE NOT NULL,

    PRIMARY KEY(post_id, user_id)
);


ALTER TABLE posts RENAME COLUMN user_id TO author;

-------------------------------------------------------- 

CREATE TABLE comments_likes(
    comment_id BIGINT REFERENCES comments(id) ON DELETE CASCADE NOT NULL,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE NOT NULL,

    PRIMARY KEY(comment_id, user_id)
);
