-- Up
CREATE TABLE tags(
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    repo_id STRING NOT NULL
);

-- Down
DROP TABLE tags;
