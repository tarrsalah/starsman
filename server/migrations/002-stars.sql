-- Up
CREATE TABLE stars(
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    repo_id STRING NOT NULL
);

-- Down
DROP TABLE stars;
