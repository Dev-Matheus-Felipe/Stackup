-- =====================================================================
-- SEED DATA (DEV ONLY)
-- Todos os usuarios usam a senha: teste123  (bcrypt, custo 10)
--
-- Premissa: tabelas vazias e sequences novas, entao os ids saem
-- users 1..15, posts 1..50. Os INSERTs de posts/comments/favorites
-- referenciam esses ids diretamente.
--
-- Perfil de cada usuario:
--  1 final-boss    posts + comments + favorites
--  2 icrowtter     posts + comments + favorites
--  3 luna_dev      so posts
--  4 pixel_pirate  so 1 post
--  5 byte_baker    so comments
--  6 nova_codes    comments + favorites
--  7 rustacean42   posts + comments
--  8 sql_sensei    posts + favorites
--  9 css_wizard    posts + comments + favorites
-- 10 lurker_01     so favorites
-- 11 null_pointer  nada (conta vazia)
-- 12 data_dani     so posts
-- 13 git_gud       so comments
-- 14 hex_hunter    posts + comments
-- 15 tux_tina      comments + favorites
-- =====================================================================

-- ---------------------------------------------------------------------
-- USERS
-- ---------------------------------------------------------------------
INSERT INTO users(username, email, password, portfolio_url, bio, created_at) VALUES
('final-boss',   'finalboss@gmail.com',   '$2a$10$MI8cyjgSFk7Yd.b8jG3Di.gXicBeARVRo77GmnxYXj2D2VvWRDQQy', 'https://www.linkedin.com/in/matheus-felipe-22b263255/', 'I am the Final Boss, GOT IT?', '2026-07-01'),
('icrowtter',    'icrowtter@gmail.com',   '$2a$10$MI8cyjgSFk7Yd.b8jG3Di.gXicBeARVRo77GmnxYXj2D2VvWRDQQy', 'https://exemplo/icrotter-portfolio.com', NULL, '2026-07-02'),
('luna-dev',     'luna.dev@gmail.com',    '$2a$10$MI8cyjgSFk7Yd.b8jG3Di.gXicBeARVRo77GmnxYXj2D2VvWRDQQy', 'https://lunadev.io', 'Frontend dev who dreams in CSS grid.', '2026-07-05'),
('pixel-pirate', 'pixelpirate@outlook.com','$2a$10$MI8cyjgSFk7Yd.b8jG3Di.gXicBeARVRo77GmnxYXj2D2VvWRDQQy', NULL, 'Sailing the seven bits.', '2026-07-08'),
('byte-baker',   'bytebaker@gmail.com',   '$2a$10$MI8cyjgSFk7Yd.b8jG3Di.gXicBeARVRo77GmnxYXj2D2VvWRDQQy', 'https://bytebaker.dev', NULL, '2026-07-10'),
('nova-codes',   'nova.codes@proton.me',  '$2a$10$MI8cyjgSFk7Yd.b8jG3Di.gXicBeARVRo77GmnxYXj2D2VvWRDQQy', NULL, NULL, '2026-07-12'),
('rustacean42',  'rustacean42@gmail.com', '$2a$10$MI8cyjgSFk7Yd.b8jG3Di.gXicBeARVRo77GmnxYXj2D2VvWRDQQy', 'https://github.com/rustacean42', 'Borrow checker survivor. Systems programming enthusiast.', '2026-07-14'),
('sql-sensei',   'sqlsensei@gmail.com',   '$2a$10$MI8cyjgSFk7Yd.b8jG3Di.gXicBeARVRo77GmnxYXj2D2VvWRDQQy', 'https://sqlsensei.com.br', 'I make slow queries fast and fast queries faster.', '2026-07-17'),
('css-wizard',   'csswizard@yahoo.com',   '$2a$10$MI8cyjgSFk7Yd.b8jG3Di.gXicBeARVRo77GmnxYXj2D2VvWRDQQy', 'https://csswizard.dev/portfolio', 'Pixel perfect or nothing.', '2026-07-19'),
('lurker-01',    'lurker01@gmail.com',    '$2a$10$MI8cyjgSFk7Yd.b8jG3Di.gXicBeARVRo77GmnxYXj2D2VvWRDQQy', NULL, NULL, '2026-07-22'),
('null-pointer', 'nullpointer@gmail.com', '$2a$10$MI8cyjgSFk7Yd.b8jG3Di.gXicBeARVRo77GmnxYXj2D2VvWRDQQy', NULL, 'NullPointerException is my love language.', '2026-07-25'),
('data-dani',    'dani.data@gmail.com',   '$2a$10$MI8cyjgSFk7Yd.b8jG3Di.gXicBeARVRo77GmnxYXj2D2VvWRDQQy', 'https://www.linkedin.com/in/data-dani', 'Data engineer. Coffee powered pipelines.', '2026-07-27'),
('git-gud',      'gitgud@gmail.com',      '$2a$10$MI8cyjgSFk7Yd.b8jG3Di.gXicBeARVRo77GmnxYXj2D2VvWRDQQy', 'https://github.com/git-gud', NULL, '2026-07-29'),
('hex-hunter',   'hexhunter@gmail.com',   '$2a$10$MI8cyjgSFk7Yd.b8jG3Di.gXicBeARVRo77GmnxYXj2D2VvWRDQQy', 'https://hexhunter.dev', 'Reverse engineering for fun and profit.', '2026-07-30'),
('tux-tina',     'tuxtina@gmail.com',     '$2a$10$MI8cyjgSFk7Yd.b8jG3Di.gXicBeARVRo77GmnxYXj2D2VvWRDQQy', NULL, 'Linux user since forever. I use Arch, btw.', '2026-07-31');

-- ---------------------------------------------------------------------
-- POSTS (50)  colunas: title, body, code, likes, user_id, created_at
-- ---------------------------------------------------------------------
INSERT INTO posts(title, body, code, likes, user_id, created_at) VALUES
-- 1
('Why I switched from Flexbox to Grid for page layouts',
 'After years of fighting flexbox for two-dimensional layouts I tried CSS Grid on a real project. Template areas made the markup much cleaner. Here is the minimal setup I now use everywhere.',
 '.layout { display: grid; grid-template-columns: 240px 1fr; gap: 1rem; }', 42, 3, '2026-08-02'),
-- 2
('Hello world, from the Final Boss',
 'First post here. I will be sharing backend tips, Spring Boot tricks and the occasional rant about legacy code. Be nice, or at least be constructive.',
 NULL, 15, 1, '2026-08-03'),
-- 3
('Ownership in Rust explained with a library book',
 'Think of a value as a library book: only one person can hold it at a time. Moving a String hands the book over, and the old variable can no longer read it. This mental model made the borrow checker click for me.',
 'let a = String::from("book"); let b = a; // a was moved, using it now is a compile error', 67, 7, '2026-08-05'),
-- 4
('Reading a binary with xxd: first steps',
 'A quick walkthrough of inspecting a firmware image with xxd and strings before reaching for heavier tools. You would be surprised how much a hex dump already tells you.',
 'xxd -l 64 firmware.bin', 23, 14, '2026-08-06'),
-- 5
('Spring Boot: stop using field injection',
 'Constructor injection makes dependencies explicit, keeps fields final and makes unit tests trivial because you can just pass mocks. Field injection hides all of that behind reflection.',
 'public UserController(UserService userService) { this.userService = userService; }', 38, 2, '2026-08-08'),
-- 6
('A 5 line CSS reset I use on every project',
 'Five lines that remove most cross-browser surprises: border-box sizing, zeroed margins, responsive media and inherited fonts on form controls. Copy, paste, forget about it.',
 '*, *::before, *::after { box-sizing: border-box; margin: 0; }', 54, 9, '2026-08-09'),
-- 7
('Dark mode with CSS custom properties only',
 'Define colors as custom properties on :root and override them inside a prefers-color-scheme media query. No JavaScript and no flash of the wrong theme on load.',
 ':root { --bg: #ffffff; } @media (prefers-color-scheme: dark) { :root { --bg: #111111; } }', 31, 3, '2026-08-11'),
-- 8
('Your index is not being used. Here is why',
 'Functions on indexed columns, implicit casts and low selectivity are the usual suspects. Always check EXPLAIN ANALYZE before blaming the planner.',
 'EXPLAIN ANALYZE SELECT * FROM users WHERE email = $1;', 76, 8, '2026-08-12'),
-- 9
('JWT in Spring Security: the minimal setup',
 'Stateless auth: a signing secret stored in an environment variable and a filter that validates the token on every request. Never commit the secret to git, and rotate it if it leaks.',
 NULL, 48, 1, '2026-08-14'),
-- 10
('Pandas vs Polars for a 5 GB CSV',
 'I benchmarked both on a 5 GB CSV. Polars with lazy scanning finished in a fraction of the time and used far less memory. Pandas is still great for small exploratory work though.',
 'df = pl.scan_csv("big.csv").filter(pl.col("amount") > 100).collect()', 29, 12, '2026-08-15'),
-- 11
('Result and Option: error handling without exceptions',
 'Rust has no exceptions: fallible functions return Result and optional values use Option. The question mark operator keeps the happy path readable while forcing you to handle errors.',
 'fn parse(s: &str) -> Result<i32, std::num::ParseIntError> { s.parse::<i32>() }', 19, 7, '2026-08-17'),
-- 12
('What is the difference between rem and em?',
 'Short answer: em is relative to the parent font size, rem is relative to the root. Use rem for predictable spacing and em when a component should scale with its own text.',
 NULL, 88, 3, '2026-08-19'),
-- 13
('Building a tiny disassembler in Python',
 'A small project to learn how x86 instructions are decoded. Capstone handles the heavy lifting, and wiring it to a simple CLI is a nice weekend exercise.',
 'from capstone import Cs, CS_ARCH_X86, CS_MODE_64', 17, 14, '2026-08-21'),
-- 14
('Flyway migrations: lessons learned the hard way',
 'Never edit an applied migration, always add a new version. Keep seed data in a separate folder so it never reaches production. Repair is a last resort, not a workflow.',
 NULL, 61, 2, '2026-08-22'),
-- 15
('Animating without layout thrash',
 'Animate transform and opacity only. They skip layout and paint, so the browser can run them on the compositor. Avoid animating top, left, width and height.',
 '.card:hover { transform: translateY(-4px); transition: transform 0.2s ease; }', 22, 9, '2026-08-24'),
-- 16
('Docker Compose for a Spring Boot + Postgres dev setup',
 'A compose file with Postgres, a named volume and a healthcheck gets the whole team to the same environment in one command. The app runs on the host for fast reloads.',
 'docker compose up -d db', 35, 1, '2026-08-26'),
-- 17
('Accessible forms: labels are not optional',
 'Placeholders are not labels. A real label tied to the input by id helps screen readers and enlarges the click target. It costs one line of HTML.',
 '<label for="email">Email</label><input id="email" type="email" required>', 26, 3, '2026-08-28'),
-- 18
('Lifetimes finally clicked for me',
 'Lifetimes are just names for how long references are valid. Once I started reading them as relationships between inputs and outputs instead of annotations, the compiler errors made sense.',
 NULL, 44, 7, '2026-08-30'),
-- 19
('Partial indexes saved my dashboard',
 'A partial index only covers rows matching a condition, so it is smaller and faster. Our dashboard query on open orders dropped from seconds to milliseconds.',
 'CREATE INDEX idx_orders_open ON orders(created_at) WHERE archived = false;', 52, 8, '2026-09-01'),
-- 20
('My first open source PR got merged!',
 'I fixed a typo in the docs, but it still counts. The maintainers were super welcoming, and now I am hunting for a good first issue to tackle next.',
 NULL, 91, 4, '2026-09-02'),
-- 21
('Stack buffer overflow 101 (in a safe lab)',
 'An educational walkthrough using a deliberately vulnerable binary inside a VM. Covers stack layout, why unchecked copies are dangerous and how modern mitigations help.',
 NULL, 33, 14, '2026-09-04'),
-- 22
('BCrypt cost factor: how high is too high?',
 'Cost 10 is around 100 ms per hash on a typical server. Raise it as hardware improves, but measure login latency first because every step doubles the work.',
 'new BCryptPasswordEncoder(12)', 57, 1, '2026-09-05'),
-- 23
('Container queries are the real game changer',
 'Media queries respond to the viewport, container queries respond to the parent. Components finally become truly reusable across sidebars, grids and full-width layouts.',
 '@container (min-width: 400px) { .card { display: flex; } }', 40, 9, '2026-09-07'),
-- 24
('Tailwind or plain CSS? My honest take',
 'I used both for a year each. Tailwind wins on speed and consistency, plain CSS wins on readability for complex components. Here is when I pick which.',
 NULL, 14, 3, '2026-09-08'),
-- 25
('N+1 queries in JPA and how to spot them',
 'Loading a list of posts and then their tags one by one is the classic N+1 trap. Turn on SQL logging, count the queries, and fix it with an entity graph or a join fetch.',
 '@EntityGraph(attributePaths = "tags") List<Post> findAll();', 69, 2, '2026-09-10'),
-- 26
('Cargo workspaces for multi-crate projects',
 'Splitting a project into crates inside one workspace speeds up incremental builds and keeps boundaries clean. Setup takes five minutes.',
 '[workspace] members = ["api", "core"]', 12, 7, '2026-09-11'),
-- 27
('Pagination: offset vs keyset',
 'Offset gets slower the deeper you page, because the database still walks the skipped rows. Keyset pagination uses the last seen id and stays fast on huge tables.',
 'SELECT * FROM posts WHERE id < $1 ORDER BY id DESC LIMIT 20;', 46, 1, '2026-09-13'),
-- 28
('CTEs are not always optimization fences',
 'Since Postgres 12, simple non-recursive CTEs are inlined by default. That means you can use them for readability without paying a performance tax.',
 'WITH recent AS (SELECT id FROM posts ORDER BY created_at DESC LIMIT 10) SELECT * FROM recent;', 37, 8, '2026-09-14'),
-- 29
('Packing and unpacking: UPX explained',
 'A short intro to executable packers: what they do, why they complicate analysis and how to spot a packed binary by looking at its entropy and sections.',
 NULL, 9, 14, '2026-09-16'),
-- 30
('Sticky headers that do not break on mobile',
 'position: sticky works great until an ancestor has overflow set. Here is the checklist I run through when a sticky header refuses to stick on mobile Safari.',
 'header { position: sticky; top: 0; }', 28, 3, '2026-09-17'),
-- 31
('CSS :has() is the parent selector we waited for',
 'With :has() you can finally style a parent based on its children. Cards with images, forms with invalid fields and many other patterns no longer need JavaScript.',
 '.card:has(img) { padding: 0; }', 63, 9, '2026-09-19'),
-- 32
('Async Rust without the headache',
 'Futures are lazy, executors drive them, and pinning exists for a reason. A friendly tour of async and await in Rust with a tiny Tokio example.',
 NULL, 25, 7, '2026-09-20'),
-- 33
('Writing integration tests with Testcontainers',
 'Spin up a real Postgres in Docker for your tests instead of mocking the repository layer. Tests get slower by a second or two but catch real SQL and migration bugs.',
 '@Container static PostgreSQLContainer<?> db = new PostgreSQLContainer<>("postgres:16");', 72, 2, '2026-09-22'),
-- 34
('Fluid typography with clamp()',
 'clamp takes a minimum, a preferred value and a maximum. Headings scale smoothly between breakpoints without a single media query.',
 'h1 { font-size: clamp(1.5rem, 4vw, 3rem); }', 34, 3, '2026-09-23'),
-- 35
('Global exception handling with @ControllerAdvice',
 'Centralize error handling in one class and return a consistent JSON body. Controllers stay clean and clients always know what an error looks like.',
 '@RestControllerAdvice public class ApiExceptionHandler { }', 41, 1, '2026-09-25'),
-- 36
('Strings, strings and more strings: triaging a binary',
 'Before opening a disassembler, run strings and look for URLs, file paths and error messages. Often that alone tells you what a program is trying to do.',
 NULL, 16, 14, '2026-09-26'),
-- 37
('Window functions: ROW_NUMBER vs RANK vs DENSE_RANK',
 'ROW_NUMBER never ties, RANK leaves gaps after ties, DENSE_RANK does not. A tiny example makes the difference obvious when building leaderboards.',
 'SELECT title, RANK() OVER (ORDER BY likes DESC) AS pos FROM posts;', 58, 8, '2026-09-28'),
-- 38
('Pattern matching in Rust beyond match',
 'Destructuring, guards, bindings and nested enums make match one of the most expressive features in the language. A few patterns I reach for daily.',
 NULL, 21, 7, '2026-09-29'),
-- 39
('Scroll snap carousel with zero JavaScript',
 'Scroll snap gives you a smooth, touch friendly carousel with just a few lines of CSS. No library, no layout jumps, and it works with the keyboard too.',
 '.track { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; }', 47, 9, '2026-10-01'),
-- 40
('Grid auto-fit vs auto-fill, finally explained',
 'Both create as many columns as fit. The difference shows when there are few items: auto-fill keeps empty tracks, auto-fit collapses them so items stretch.',
 'grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));', 79, 3, '2026-10-02'),
-- 41
('Redis cache in front of Postgres: when it is worth it',
 'Caching helps for read-heavy, rarely changing data. Before adding Redis, check your indexes and query plans, because the cheapest cache is a fast query.',
 NULL, 30, 2, '2026-10-04'),
-- 42
('Why I stopped returning entities from controllers',
 'Returning JPA entities leaks your schema and invites lazy loading surprises. Small response DTOs keep the API stable even when the database changes.',
 NULL, 53, 1, '2026-10-05'),
-- 43
('Idempotent data pipelines with ON CONFLICT',
 'Re-running a job should never duplicate rows. ON CONFLICT turns inserts into safe upserts, so retries and backfills become boring, which is exactly what you want.',
 'INSERT INTO daily_stats(day, total) VALUES ($1, $2) ON CONFLICT (day) DO UPDATE SET total = EXCLUDED.total;', 36, 12, '2026-10-07'),
-- 44
('Zero-cost abstractions, a practical example',
 'Iterators in Rust compile down to the same code as a hand-written loop. A practical comparison with benchmarks and assembly output.',
 NULL, 18, 7, '2026-10-08'),
-- 45
('Setting up a Ghidra project for beginners',
 'A beginner friendly guide: create a project, import a binary, run auto analysis and rename functions as you learn what they do. Patience beats cleverness here.',
 NULL, 27, 14, '2026-10-10'),
-- 46
('Debugging CSS with outline: the lazy trick',
 'When a layout looks wrong, outline every element. Unlike border, outline does not change box sizes, so nothing shifts while you debug.',
 '* { outline: 1px solid red; }', 20, 3, '2026-10-11'),
-- 47
('VACUUM, autovacuum and table bloat',
 'Dead tuples pile up after updates and deletes. Autovacuum usually handles it, but heavy write tables may need tuned thresholds. How to check bloat and when to act.',
 NULL, 43, 8, '2026-10-13'),
-- 48
('View Transitions API in 10 minutes',
 'Smooth page transitions used to need a framework. With one browser API call you can cross-fade between states, and shared elements can animate between views.',
 'document.startViewTransition(() => updateDOM());', 32, 9, '2026-10-14'),
-- 49
('Rate limiting with Bucket4j',
 'Protect your endpoints from abuse with a token bucket. A short guide to wiring Bucket4j into a Spring filter keyed by IP or user id.',
 NULL, 24, 2, '2026-10-15'),
-- 50
('Releasing v1.0 of my side project',
 'After months of evenings and weekends my side project finally hit 1.0. Thanks to everyone who gave feedback in the comments, it shaped the final design.',
 NULL, 11, 1, '2026-10-16');

-- ---------------------------------------------------------------------
-- COMMENTS (30)  colunas: body, likes, post_id, author, created_at
-- ---------------------------------------------------------------------
INSERT INTO comments(body, likes, post_id, author, created_at) VALUES
('Great explanation! I always mixed these two up.', 5, 12, 5, '2026-08-20'),
('Welcome! Looking forward to the Spring Boot tips.', 3, 2, 13, '2026-08-04'),
('The auto-fit collapsing behavior finally makes sense to me, thanks!', 8, 40, 6, '2026-10-03'),
('Using custom properties for theming is the cleanest approach, agreed.', 2, 7, 1, '2026-08-13'),
('Testcontainers saved us from so many migration bugs. Highly recommend.', 6, 33, 15, '2026-09-24'),
('Rule of thumb I use: rem for spacing, em for things that follow the component font size.', 11, 12, 9, '2026-08-21'),
('Congrats on the merge! The first one is always the hardest.', 9, 20, 5, '2026-09-03'),
('Ghidra has a steep learning curve but this is a solid starting point.', 1, 45, 2, '2026-10-12'),
('The library book analogy is perfect. Sharing this with my team.', 4, 3, 14, '2026-08-07'),
('Did not know about inlining since PG 12. Good to know.', 0, 28, 13, '2026-09-15'),
('Small note: rem also respects the user browser font size setting, which is great for accessibility.', 7, 12, 7, '2026-08-25'),
('Do you key the bucket by IP or by user id? I have been going back and forth.', 2, 49, 5, '2026-10-16'),
('Do you recommend storing the secret in a vault for production?', 0, 9, 6, '2026-08-16'),
('strings first, then everything else. Solid advice.', 3, 36, 1, '2026-09-27'),
('Nice to see a new face here. Welcome aboard!', 5, 2, 15, '2026-08-06'),
('Labels matter so much. Half the forms I audit skip them.', 1, 17, 13, '2026-08-29'),
('We hit exactly this N+1 problem last month. Join fetch fixed it.', 2, 25, 9, '2026-09-12'),
('Bookmarked. Perfect reference for my next layout.', 0, 40, 5, '2026-10-05'),
('The :has() selector is going to replace a lot of JS in my projects.', 4, 31, 2, '2026-09-21'),
('Does this also work with the system toggle in iOS?', 0, 7, 6, '2026-08-12'),
('Would love to see the assembly comparison in more detail.', 1, 44, 1, '2026-10-09'),
('Thanks for the quick summary, very clear.', 0, 12, 13, '2026-08-30'),
('Constructor injection plus final fields also makes immutability trivial.', 6, 5, 7, '2026-08-10'),
('Congratulations on the 1.0 release! The UI looks great.', 8, 50, 9, '2026-10-17'),
('The community is great. Keep going, you got this!', 3, 20, 6, '2026-09-04'),
('Pattern matching is what makes me miss Rust in other languages.', 2, 38, 5, '2026-09-30'),
('Compositor-only animations made a huge difference on our low-end devices.', 5, 15, 2, '2026-08-26'),
('Measure first, then tune. We settled on cost 12 for our login endpoint.', 4, 22, 7, '2026-09-06'),
('Also make sure the token expiration is short, with a refresh flow.', 1, 9, 1, '2026-08-18'),
('Startup time is the only downside, but it is worth it.', 0, 33, 14, '2026-09-25');

-- ---------------------------------------------------------------------
-- FAVORITES (10)  colunas: post_id, user_id
-- ---------------------------------------------------------------------
INSERT INTO post_favorites(post_id, user_id) VALUES
(14, 10),
(2,  6),
(33, 15),
(7,  1),
(45, 8),
(12, 10),
(29, 9),
(40, 6),
(5,  15),
(21, 2);