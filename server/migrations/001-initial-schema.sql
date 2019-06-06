-- Up
CREATE TABLE users(
    id INTEGER PRIMARY KEY ASC,
    username VARCHAR(255),
    github_id INTEGER
);

-- Down
DROP TABLE users;
