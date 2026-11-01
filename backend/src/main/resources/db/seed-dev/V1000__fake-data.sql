-- Dev seed data (30 users, 20 tags, 50 posts, 30 comments).
-- Keep this file in db/seed-dev so it only runs with the dev Flyway locations.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1) USERS (all passwords hashed with BCrypt cost 10, same as BCryptPasswordEncoder(10))
INSERT INTO users (username, email, password, bio, portfolio_url, created_at)
SELECT
    v.username,
    v.email,
    crypt('teste123', gen_salt('bf', 10)),
    v.bio,
    v.portfolio_url,
    current_date - (60 + floor(random() * 60))::int
FROM (VALUES
    ('test_user', 'teste@gmail.com', 'Account used for testing the platform.', 'https://testuser.dev'),
    ('emma_carter', 'emma.carter@outlook.com', 'Backend developer who loves clean APIs and strong coffee.', 'https://emmacarter.dev'),
    ('liam_johnson', 'liam.johnson@yahoo.com', 'Full-stack dev. Currently learning Rust on weekends.', NULL),
    ('olivia_martin', 'olivia.martin@proton.me', 'Frontend engineer focused on accessibility.', 'https://oliviamartin.dev'),
    ('noah_williams', 'noah.williams@gmail.com', 'Computer science student and open source newbie.', NULL),
    ('ava_thompson', 'ava.thompson@outlook.com', 'DevOps engineer. Automating everything I can.', 'https://avathompson.dev'),
    ('ethan_brown', 'ethan.brown@yahoo.com', 'Java developer for six years. Spring fan.', NULL),
    ('sophia_davis', 'sophia.davis@proton.me', 'Data enthusiast who writes a lot of SQL.', 'https://sophiadavis.dev'),
    ('mason_wilson', 'mason.wilson@gmail.com', 'Self-taught developer and career changer.', NULL),
    ('isabella_moore', 'isabella.moore@outlook.com', 'UI developer who cares about small details.', 'https://isabellamoore.dev'),
    ('lucas_taylor', 'lucas.taylor@yahoo.com', 'Building side projects at night.', NULL),
    ('mia_anderson', 'mia.anderson@proton.me', 'Junior developer learning something new every day.', NULL),
    ('logan_thomas', 'logan.thomas@gmail.com', 'Backend engineer. Postgres and Docker daily.', 'https://loganthomas.dev'),
    ('amelia_jackson', 'amelia.jackson@outlook.com', 'Tech lead. Mentoring is my favorite part of the job.', NULL),
    ('james_white', 'james.white@yahoo.com', 'TypeScript evangelist.', 'https://jameswhite.dev'),
    ('harper_harris', 'harper.harris@proton.me', 'Bootcamp grad, now working on a fintech team.', NULL),
    ('benjamin_clark', 'benjamin.clark@gmail.com', 'Software engineer who enjoys testing and refactoring.', NULL),
    ('evelyn_lewis', 'evelyn.lewis@outlook.com', 'React developer and part-time designer.', 'https://evelynlewis.dev'),
    ('henry_walker', 'henry.walker@yahoo.com', 'Cloud and infrastructure nerd.', NULL),
    ('abigail_hall', 'abigail.hall@proton.me', 'Python developer. I like automating boring stuff.', 'https://abigailhall.dev'),
    ('jack_young', 'jack.young@gmail.com', 'Hobby game dev, web dev by day.', NULL),
    ('emily_king', 'emily.king@outlook.com', 'Full-stack engineer and coffee addict.', NULL),
    ('owen_wright', 'owen.wright@yahoo.com', 'Studying algorithms for fun and interviews.', NULL),
    ('ella_scott', 'ella.scott@proton.me', 'QA engineer turned developer.', 'https://ellascott.dev'),
    ('daniel_green', 'daniel.green@gmail.com', 'Freelancer building web apps for small businesses.', 'https://danielgreen.dev'),
    ('chloe_baker', 'chloe.baker@outlook.com', 'CS major, very into databases.', NULL),
    ('samuel_adams', 'samuel.adams@yahoo.com', 'Mobile and web developer.', NULL),
    ('grace_nelson', 'grace.nelson@proton.me', 'Open source contributor and docs nerd.', 'https://gracenelson.dev'),
    ('caleb_hill', 'caleb.hill@gmail.com', 'Backend dev. REST, queues and caching.', NULL),
    ('zoe_ramirez', 'zoe.ramirez@outlook.com', 'Frontend dev who loves CSS tricks.', 'https://zoeramirez.dev')
) AS v(username, email, bio, portfolio_url);

-- 2) TAGS (20)
INSERT INTO tags (name) VALUES
    ('java'),
    ('spring-boot'),
    ('postgresql'),
    ('docker'),
    ('flyway'),
    ('react'),
    ('nextjs'),
    ('typescript'),
    ('javascript'),
    ('python'),
    ('css'),
    ('tailwind'),
    ('git'),
    ('api-rest'),
    ('jwt'),
    ('testing'),
    ('devops'),
    ('algorithms'),
    ('database'),
    ('frontend');

-- 3) POSTS (50) and their tags (2 to 5 each)
WITH seed (title, body, code, author, tag_names) AS (
    VALUES
    ('Flyway checksum mismatch after editing an old migration, how do I fix it?',
     'I edited a migration that was already applied and now the app won''t start because of a checksum error. Is there a clean way to fix this in dev without wiping the whole database?',
     './mvnw flyway:repair',
     'emma_carter', ARRAY['flyway', 'postgresql', 'database', 'java']),
    ('Is it safe to store JWTs in localStorage?',
     'I''m building a login flow with Next.js and a Spring Boot API. Everyone says localStorage is risky for tokens, but cookies feel more complicated to set up. What do you actually use in real projects?',
     NULL,
     'liam_johnson', ARRAY['jwt', 'nextjs', 'spring-boot', 'frontend']),
    ('Tailwind classes are getting out of control, how do you organize them?',
     'My components now have 15+ utility classes each and they are hard to read. Do you extract components, use @apply, or just live with long class lists?',
     NULL,
     'olivia_martin', ARRAY['tailwind', 'css', 'react', 'frontend']),
    ('Docker container doesn''t see the new npm package I installed',
     'I installed a dependency on my machine and rebuilt the stack, but the container still says the module is missing. I''m using a bind mount plus an extra volume for node_modules. What am I doing wrong?',
     'services:
  web:
    volumes:
      - ./frontend:/app
      - /app/node_modules',
     'noah_williams', ARRAY['docker', 'javascript', 'nextjs', 'devops']),
    ('How do you make the API wait for Postgres in Docker Compose?',
     'My API crashes on startup because the database isn''t ready yet. depends_on alone doesn''t seem to help. What''s the proper way to wait for Postgres to accept connections?',
     'api:
  depends_on:
    - db',
     'ava_thompson', ARRAY['docker', 'postgresql', 'devops', 'spring-boot']),
    ('Spring Boot: should @Transactional go on the service or the repository?',
     'I see both styles in tutorials. In a typical layered app, where do you put @Transactional and why? I''m worried about partial saves when a service calls several repositories.',
     NULL,
     'ethan_brown', ARRAY['java', 'spring-boot', 'database']),
    ('Best way to paginate a large table in PostgreSQL?',
     'OFFSET gets slower and slower the deeper users go into the pages. Keyset pagination looks promising but sorting by multiple columns confuses me. Any practical examples?',
     'SELECT * FROM posts
ORDER BY created_at DESC
LIMIT 20 OFFSET 40000;',
     'sophia_davis', ARRAY['postgresql', 'database', 'api-rest', 'algorithms']),
    ('Simple Git branching workflow for a team of three?',
     'I keep making a mess with merge conflicts and nobody on my team agrees on a workflow. What''s a simple branching strategy that works for a small team without too much ceremony?',
     NULL,
     'mason_wilson', ARRAY['git', 'devops']),
    ('Accessible dropdown menu in React without a library?',
     'I want to build a dropdown that works with keyboard and screen readers, but most examples I find only handle mouse clicks. What do I need besides aria-expanded?',
     NULL,
     'isabella_moore', ARRAY['react', 'frontend', 'javascript', 'css']),
    ('Show and tell: my first REST API with Spring Boot',
     'Finished a small blog API with users, posts and comments. Would love feedback on the project structure and endpoint naming before I add authentication.',
     NULL,
     'lucas_taylor', ARRAY['java', 'spring-boot', 'api-rest']),
    ('What is the real difference between let, const and var?',
     'I know var is old and const can''t be reassigned, but I still get confused about scope and hoisting. Could someone explain it with a simple example?',
     'console.log(a); // undefined
var a = 1;

console.log(b); // ReferenceError
let b = 2;',
     'mia_anderson', ARRAY['javascript', 'frontend']),
    ('When should I add an index in PostgreSQL?',
     'My posts table has about 200k rows and the feed query is getting slow. I''ve heard indexes help but also slow down writes. How do you decide which columns deserve one?',
     NULL,
     'logan_thomas', ARRAY['postgresql', 'database']),
    ('Code review habits that actually help junior developers',
     'After a year of reviewing PRs, my best tip is to ask questions instead of giving orders. "What happens if this list is empty?" teaches more than "add a null check". What works for you?',
     NULL,
     'amelia_jackson', ARRAY['git', 'testing']),
    ('TypeScript: type or interface, which one do you pick?',
     'Our team keeps going back and forth on this. I know they overlap a lot, but is there a rule of thumb for when one is clearly better than the other?',
     NULL,
     'james_white', ARRAY['typescript', 'javascript', 'frontend']),
    ('Unit tests or integration tests for a REST API?',
     'My team has lots of unit tests but bugs still slip through at the endpoint level. Should we write more integration tests, or is that a sign our unit tests are testing the wrong things?',
     NULL,
     'harper_harris', ARRAY['testing', 'api-rest', 'java', 'spring-boot']),
    ('Is mocking the database in tests worth it?',
     'Mocks make my tests fast, but I''ve been burned when the real query behaved differently. Do you test against a real Postgres, or stick with an in-memory database?',
     NULL,
     'benjamin_clark', ARRAY['testing', 'database', 'postgresql', 'java']),
    ('What is your go-to way of centering a div?',
     'I know flexbox and grid both work, but I''d like to know which one you reach for first and why. Bonus points for the Tailwind version.',
     '.center {
  display: grid;
  place-items: center;
}',
     'evelyn_lewis', ARRAY['css', 'tailwind', 'frontend']),
    ('How do you manage environment variables across dev and prod in Docker?',
     'Right now I have a .env file for local work and I''m copying values by hand to the server. There must be a cleaner way. Do you use separate compose files, secrets, or something else?',
     NULL,
     'henry_walker', ARRAY['docker', 'devops', 'spring-boot']),
    ('Is a Python script a good way to seed a dev database?',
     'I started writing a script with Faker to generate users and posts, but SQL migrations seem simpler to share with the team. What are the pros and cons of each approach?',
     NULL,
     'abigail_hall', ARRAY['python', 'database', 'postgresql', 'testing']),
    ('React useEffect runs twice in development, is this a bug?',
     'My effect that fetches data fires two times when I load the page locally. I thought I had an infinite loop at first. Is something wrong with my component?',
     'useEffect(() => {
  fetch(''/api/posts'').then(r => r.json()).then(setPosts);
}, []);',
     'jack_young', ARRAY['react', 'javascript', 'nextjs', 'frontend']),
    ('How do you structure a Next.js project as it grows?',
     'My app/ folder is turning into a pile of components, hooks and helpers. Do you organize by feature, by file type, or something in between? Looking for real examples that scale.',
     NULL,
     'emily_king', ARRAY['nextjs', 'react', 'typescript', 'frontend']),
    ('Is O(n log n) really that much worse than O(n)?',
     'I understand the notation but I can''t feel the difference. For an input of a million items, how much slower is a sort compared to a single pass in practice?',
     NULL,
     'owen_wright', ARRAY['algorithms', 'javascript']),
    ('How do you deal with flaky end-to-end tests?',
     'About 1 in 10 runs of our E2E suite fails for no clear reason, and now nobody trusts the results. Retries feel like a band-aid. What actually fixed it for you?',
     NULL,
     'ella_scott', ARRAY['testing', 'javascript', 'devops']),
    ('How do you version a REST API without breaking clients?',
     'I have a few mobile clients that can''t update right away. Should I version in the URL, in a header, or just avoid breaking changes? Curious what people do in production.',
     NULL,
     'daniel_green', ARRAY['api-rest', 'java', 'spring-boot']),
    ('Database normalization: how far is too far?',
     'In class we learned up to third normal form, but my schema now needs five joins for a simple profile page. When is it OK to denormalize a little?',
     NULL,
     'chloe_baker', ARRAY['database', 'postgresql']),
    ('CORS error between Next.js and my API, what am I missing?',
     'The browser blocks my requests from localhost:3000 to the API with a CORS policy error. The endpoint works fine in Postman. Do I need to change something in the backend or in Next.js?',
     'fetch(''http://localhost:8080/api/posts'', {
  credentials: ''include''
})',
     'samuel_adams', ARRAY['nextjs', 'api-rest', 'spring-boot', 'javascript']),
    ('Writing commit messages your future self will thank you for',
     'A good message explains why, not just what. "Fix pagination bug when page is 0" beats "fix stuff". Here''s the format I use on every project and why it helps when debugging.',
     'feat: add keyset pagination to feed

Offset queries got slow past page 500.
Use (created_at, id) as the cursor instead.',
     'grace_nelson', ARRAY['git', 'devops']),
    ('JWT refresh tokens: where should they live?',
     'I''m adding refresh tokens to my API. Access tokens expire in 15 minutes, but I''m not sure where the refresh token should be stored on the client or whether to keep it in the database.',
     NULL,
     'caleb_hill', ARRAY['jwt', 'api-rest', 'spring-boot', 'frontend']),
    ('Animating a gradient border with pure CSS',
     'I wanted a glowing border that slowly rotates around a card without using JavaScript. After some trial and error, @property and conic-gradient did the trick. Sharing the snippet below.',
     '@property --angle {
  syntax: ''<angle>'';
  initial-value: 0deg;
  inherits: false;
}

.card {
  border: 3px solid transparent;
  background: linear-gradient(#111, #111) padding-box,
    conic-gradient(from var(--angle), #6366f1, #ec4899, #6366f1) border-box;
  animation: spin 4s linear infinite;
}

@keyframes spin {
  to { --angle: 360deg; }
}',
     'zoe_ramirez', ARRAY['css', 'frontend']),
    ('Welcome! This is a test post',
     'This post exists so the feed, likes, comments and tags can be tested with the test account. Feel free to like it or leave a comment.',
     NULL,
     'test_user', ARRAY['testing', 'frontend']),
    ('Tip: keeping dev seed data out of production with Flyway',
     'I put fake data in a separate folder and only load it in the dev profile, so production never sees it. Sharing the config that worked for me.',
     '# dev only
spring.flyway.locations=classpath:db/migration,classpath:db/seed-dev',
     'emma_carter', ARRAY['flyway', 'spring-boot', 'postgresql', 'docker']),
    ('Server components vs client components in Next.js: when to use which?',
     'I''m migrating a pages-router app and the "use client" directive confuses me. What''s your rule of thumb for deciding what stays on the server?',
     NULL,
     'liam_johnson', ARRAY['nextjs', 'react', 'typescript']),
    ('Please don''t remove the focus outline',
     'I keep seeing outline: none in code reviews. Keyboard users rely on it to know where they are. If you don''t like the default, restyle it instead of deleting it.',
     'button:focus-visible {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}',
     'olivia_martin', ARRAY['css', 'frontend', 'tailwind']),
    ('Recursion still confuses me, any good way to visualize it?',
     'I can follow factorial, but when a function calls itself twice, like Fibonacci, I get lost. How did you finally build the intuition for it?',
     'def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)',
     'noah_williams', ARRAY['algorithms', 'python']),
    ('Small Dockerfile changes that cut my build time in half',
     'Copy package.json and install dependencies before copying the rest of the source, so Docker can reuse the cached layer. Also add a proper .dockerignore. Simple, but it made a huge difference.',
     'COPY package*.json ./
RUN npm ci
COPY . .',
     'ava_thompson', ARRAY['docker', 'devops', 'javascript']),
    ('BCrypt cost factor: is 10 still enough?',
     'Our Spring Security config uses BCryptPasswordEncoder(10), the default. Hardware keeps getting faster, so should we bump it up? What cost do you use in production?',
     NULL,
     'ethan_brown', ARRAY['java', 'spring-boot', 'jwt']),
    ('Window functions finally clicked for me',
     'ROW_NUMBER() with PARTITION BY is perfect for getting the latest row per group. Here''s the query I use to fetch each user''s most recent post without any subquery gymnastics.',
     'SELECT *
FROM (
  SELECT p.*,
         ROW_NUMBER() OVER (
           PARTITION BY user_id
           ORDER BY created_at DESC, id DESC
         ) AS rn
  FROM posts p
) t
WHERE rn = 1;',
     'sophia_davis', ARRAY['postgresql', 'database']),
    ('Should I learn Java or Python first for backend work?',
     'I''m switching careers and want a backend job within a year. Job posts in my area ask for both. Which one would you start with, and why?',
     NULL,
     'mason_wilson', ARRAY['java', 'python']),
    ('How do you handle form validation in React?',
     'I''ve tried writing validation by hand with useState, but it gets messy fast with more than three fields. Are form libraries worth it, and how do you share rules with the backend?',
     NULL,
     'isabella_moore', ARRAY['react', 'typescript', 'frontend']),
    ('Is optimistic UI for likes worth the complexity?',
     'When a user clicks like, I update the counter instantly and roll back if the request fails. It feels great, but the code got harder to follow. Do you do this in your projects?',
     NULL,
     'lucas_taylor', ARRAY['react', 'api-rest', 'frontend', 'javascript']),
    ('What does idempotent mean for an API endpoint?',
     'I keep seeing this word in REST articles. Is it just about not creating duplicates? And which HTTP methods are supposed to be idempotent?',
     NULL,
     'mia_anderson', ARRAY['api-rest', 'spring-boot']),
    ('Many-to-many relationship in Postgres: join table design',
     'I have posts and tags and I''m using a join table with two foreign keys. Should it have its own id column or just a composite primary key? Any indexing advice for lookups by tag?',
     'CREATE TABLE posts_tags (
  post_id BIGINT REFERENCES posts(id),
  tag_id BIGINT REFERENCES tags(id),
  PRIMARY KEY (post_id, tag_id)
);',
     'logan_thomas', ARRAY['postgresql', 'database', 'java']),
    ('Lessons from my first year as a tech lead',
     'Biggest surprise: writing less code and unblocking people more. Clear priorities and honest feedback mattered more than any technical decision I made. What would you tell a new lead?',
     NULL,
     'amelia_jackson', ARRAY['devops', 'git']),
    ('TypeScript generics explained with a simple example',
     'Generics clicked for me when I stopped thinking of them as magic and saw them as function parameters for types. Here''s a tiny example that finally made it clear.',
     'function first<T>(items: T[]): T | undefined {
  return items[0];
}

const n = first([1, 2, 3]); // number
const s = first([''a'', ''b'']); // string',
     'james_white', ARRAY['typescript', 'javascript']),
    ('How do you test code that depends on the current date?',
     'I have logic that behaves differently on weekends and I can''t write a stable test for it. Do you inject a clock, freeze time with a library, or something else?',
     NULL,
     'harper_harris', ARRAY['testing', 'java', 'python']),
    ('Refactoring a 500-line service class: where do I start?',
     'I inherited a service that does validation, pricing, emails and database access in a single class. There are almost no tests. What''s a safe first step to break it apart?',
     NULL,
     'benjamin_clark', ARRAY['java', 'spring-boot', 'testing']),
    ('Dark mode with Tailwind: class strategy or media query?',
     'I want to follow the system preference but also let users toggle it manually. Which strategy do you use in Next.js projects, and how do you avoid the flash of the wrong theme on load?',
     NULL,
     'evelyn_lewis', ARRAY['tailwind', 'css', 'react', 'nextjs']),
    ('GitHub Actions workflow to build and push a Docker image',
     'Minimal workflow I use to build and push an image on every merge to main (the registry login step is omitted here). It has been reliable for months. Happy to hear improvements.',
     'name: build
on:
  push:
    branches: [main]
jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: myuser/myapp:latest',
     'henry_walker', ARRAY['docker', 'devops', 'git']),
    ('Python or JavaScript for quick automation scripts?',
     'I need to rename files, call a couple of APIs and generate a report every week. I know both languages a little. Which one gets the job done faster with fewer dependencies?',
     NULL,
     'abigail_hall', ARRAY['python', 'javascript']),
    ('Handling file uploads in a REST API',
     'Users need to upload profile pictures. Should I store the files in the database, on disk, or in object storage? And how do you validate size and type safely?',
     NULL,
     'daniel_green', ARRAY['api-rest', 'spring-boot', 'frontend'])
),
new_posts AS (
    INSERT INTO posts (title, body, code, likes, user_id, created_at)
    SELECT s.title, s.body, s.code, floor(random() * 31)::int, u.id,
           current_date - floor(random() * 60)::int
    FROM seed s
    JOIN users u ON u.username = s.author
    RETURNING id, title
)
INSERT INTO posts_tags (post_id, tag_id)
SELECT np.id, t.id
FROM new_posts np
JOIN seed s ON s.title = np.title
CROSS JOIN LATERAL unnest(s.tag_names) AS tn(name)
JOIN tags t ON t.name = tn.name;

-- 4) COMMENTS (30, each one on a different post)
WITH seed (post_title, commenter, body) AS (
    VALUES
    ('Flyway checksum mismatch after editing an old migration, how do I fix it?',
     'liam_johnson',
     'Run flyway repair to update the checksum in the history table. In dev it''s usually easier to drop the volume and start fresh, though.'),
    ('Is it safe to store JWTs in localStorage?',
     'caleb_hill',
     'We use httpOnly cookies with SameSite set to Lax. It takes a bit more setup, but XSS can''t read the token, which was worth it for us.'),
    ('Tailwind classes are getting out of control, how do you organize them?',
     'evelyn_lewis',
     'Extract components first. @apply is fine for tiny things like buttons, but a small React component keeps everything readable and reusable.'),
    ('Docker container doesn''t see the new npm package I installed',
     'ava_thompson',
     'The anonymous volume keeps the old node_modules. Run docker compose down -v or rebuild with --renew-anon-volumes and it will pick up the new package.'),
    ('How do you make the API wait for Postgres in Docker Compose?',
     'henry_walker',
     'Add a pg_isready healthcheck to the db service and use depends_on with condition: service_healthy. That fixed the exact same problem for me.'),
    ('Spring Boot: should @Transactional go on the service or the repository?',
     'benjamin_clark',
     'Put it on the service layer. A service method usually represents one business operation, and that''s the unit you want to commit or roll back.'),
    ('Best way to paginate a large table in PostgreSQL?',
     'logan_thomas',
     'Keyset pagination is the way to go. Sort by (created_at, id) and pass the last pair as the cursor. The tie-breaker on id avoids skipped rows.'),
    ('Simple Git branching workflow for a team of three?',
     'amelia_jackson',
     'For three people, keep main always deployable and use short-lived feature branches. Rebase before opening a PR and conflicts get much smaller.'),
    ('Accessible dropdown menu in React without a library?',
     'zoe_ramirez',
     'Look at the WAI-ARIA menu button pattern. You need aria-expanded, arrow key navigation and Escape to close. Tedious, but doable without a library.'),
    ('Show and tell: my first REST API with Spring Boot',
     'emma_carter',
     'Nice work! One tip: name endpoints with plural nouns like /posts and /comments, and let the HTTP verbs describe the action.'),
    ('When should I add an index in PostgreSQL?',
     'sophia_davis',
     'Index the columns you filter or join on a lot, then check with EXPLAIN ANALYZE. Don''t add indexes blindly, they slow down writes.'),
    ('TypeScript: type or interface, which one do you pick?',
     'emily_king',
     'I use interface for object shapes that might be extended and type for unions and utility types. Either works, just stay consistent in the codebase.'),
    ('Unit tests or integration tests for a REST API?',
     'ella_scott',
     'Both. Unit tests for business rules, a handful of integration tests for the critical endpoints. Testcontainers makes the latter much less painful.'),
    ('What is your go-to way of centering a div?',
     'samuel_adams',
     'flex items-center justify-center in Tailwind, or place-items: center with grid. Grid is shorter when you only need to center one child.'),
    ('React useEffect runs twice in development, is this a bug?',
     'liam_johnson',
     'That''s React Strict Mode in development. It mounts, unmounts and mounts again on purpose to catch missing cleanups. It won''t happen in production.'),
    ('How do you structure a Next.js project as it grows?',
     'james_white',
     'I group by feature instead of by file type. Each feature folder has its components, hooks and types, so things that change together live together.'),
    ('How do you deal with flaky end-to-end tests?',
     'benjamin_clark',
     'Wait for conditions, never fixed timeouts. Also isolate test data so tests don''t depend on each other. Those two fixed most of our flakiness.'),
    ('How do you version a REST API without breaking clients?',
     'emma_carter',
     'We version in the URL, like /api/v1/posts. It''s not the prettiest option, but it''s explicit and easy to document and route.'),
    ('CORS error between Next.js and my API, what am I missing?',
     'ethan_brown',
     'Your API has to allow the frontend origin explicitly. In Spring, configure a CorsConfigurationSource and enable cors() in the security filter chain.'),
    ('JWT refresh tokens: where should they live?',
     'ava_thompson',
     'Keep the refresh token in an httpOnly cookie and the short-lived access token in memory. Rotate the refresh token on every use.'),
    ('Tip: keeping dev seed data out of production with Flyway',
     'logan_thomas',
     'Great tip. I''d also keep dev seeds in a high version range so they never clash with real migrations later.'),
    ('Server components vs client components in Next.js: when to use which?',
     'isabella_moore',
     'Default to server components and add "use client" only when you need state, effects or browser APIs. It keeps the bundle much smaller.'),
    ('Small Dockerfile changes that cut my build time in half',
     'henry_walker',
     'Copying package.json before the rest of the source made the biggest difference for me. Dependency layers stay cached until they change.'),
    ('BCrypt cost factor: is 10 still enough?',
     'amelia_jackson',
     '10 is the default and still fine for most apps. Many teams use 12 now. Measure the hash time on your server and aim for roughly 250ms.'),
    ('Window functions finally clicked for me',
     'chloe_baker',
     'ROW_NUMBER() with PARTITION BY was my gateway too. Now I use it for "latest row per group" queries all the time.'),
    ('Should I learn Java or Python first for backend work?',
     'ethan_brown',
     'Either is a solid choice. Java has stronger typing and plenty of jobs, Python is gentler at the start. Pick the one you will actually build projects in.'),
    ('How do you handle form validation in React?',
     'james_white',
     'React Hook Form with Zod is my go-to. You define the schema once and get both validation and TypeScript types for free.'),
    ('What does idempotent mean for an API endpoint?',
     'caleb_hill',
     'It means calling the endpoint multiple times has the same effect as calling it once. PUT and DELETE should be idempotent, POST usually isn''t.'),
    ('Many-to-many relationship in Postgres: join table design',
     'sophia_davis',
     'A join table with a composite primary key on both foreign keys is the standard approach. Add an index on the second column for reverse lookups.'),
    ('GitHub Actions workflow to build and push a Docker image',
     'ava_thompson',
     'Don''t forget to cache layers with the build-push-action cache options. It cut our pipeline from six minutes to about two.')
)
INSERT INTO comments (body, likes, post_id, author, created_at)
SELECT s.body, floor(random() * 31)::int, p.id, u.id,
       LEAST(current_date, p.created_at + floor(random() * 4)::int)
FROM seed s
JOIN posts p ON p.title = s.post_title
JOIN users u ON u.username = s.commenter;