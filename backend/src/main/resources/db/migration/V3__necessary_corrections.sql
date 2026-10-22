ALTER TABLe posts
    DROP CONSTRAINT IF EXISTS posts_user_id_fkey,
    ADD COLUMN created_at DATE DEFAULT now(),
    ADD COLUMN code VARCHAR(1000),

    ADD CONSTRAINT posts_user_id_fkey
        FOREIGN KEY (user_id) 
        REFERENCES users(id)
        ON DELETE CASCADE;

ALTER TABLE posts RENAME COLUMN description TO body;

-------------------------------------------------------- 

ALTER TABLE comments
    DROP CONSTRAINT IF EXISTS comments_post_id_fkey,
    ADD COLUMN created_at DATE DEFAULT now(),

    ADD COLUMN author BIGINT 
        REFERENCES users(id) 
        ON DELETE CASCADE NOT NULL,
        
    ADD CONSTRAINT comments_post_id_fkey 
        FOREIGN KEY (post_id) 
        REFERENCES posts(id) 
        ON DELETE CASCADE;

ALTER TABLE comments RENAME COLUMN text TO body;

-------------------------------------------------------- 

ALTER TABLE users
    ADD COLUMN created_at DATE DEFAULT now(),
    ADD COLUMN portfolio_url VARCHAR(300),
    ADD COLUMN bio VARCHAR(500),

    ADD COLUMN avatar VARCHAR(500)
        DEFAULT floor(random() * 6)::int::text,

    ADD CONSTRAINT users_portfolio_url
        CHECK (portfolio_url ~ '^https://');

-------------------------------------------------------- 

CREATE TABLE tags(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE posts_tags(
    post_id BIGINT REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
    tag_id BIGINT REFERENCES tags(id) ON DELETE CASCADE NOT NULL,

    PRIMARY KEY (post_id, tag_id)
);

-------------------------------------------------------- 

CREATE TABLE post_favorites(
    post_id BIGINT REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE NOT NULL,

    PRIMARY KEY(post_id, user_id)
);

-------------------------------------------------------- 

CREATE INDEX idx_post_tags_tag_id ON posts_tags(tag_id);