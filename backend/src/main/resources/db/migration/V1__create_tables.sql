CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(10) NOT NULL UNIQUE,
    email VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL
    
);

CREATE TABLE posts(
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(250) NOT NULL,
    likes INT DEFAULT 0,

    user_id BIGINT REFERENCES users(id) NOT NULL
);

CREATE TABLE comments(
    id BIGSERIAL PRIMARY KEY,
    text VARCHAR(250) NOT NULL,
    likes INT DEFAULT 0,
    
    post_id BIGINT REFERENCES posts(id) NOT NULL
);

