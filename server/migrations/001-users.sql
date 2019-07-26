-- Up
CREATE TABLE users(
    id INTEGER PRIMARY KEY ASC,
    username VARCHAR(255) UNIQUE,
    github_id INTEGER UNIQUE,
    timestamp  timestamp not null default current_timestamp
);

-- Down
DROP TABLE users;
