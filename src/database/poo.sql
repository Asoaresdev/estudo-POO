-- Active: 1691104084090@@127.0.0.1@3306
CREATE TABLE video(
    id TEXT  UNIQUE PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    dur_seconds REAL NOT NULL,
    date_upload TEXT DEFAULT (DATETIME())NOT NULL
);

INSERT INTO video(id, title, dur_seconds, date_upload)
VALUES("001", "TESETE", 200, "2023/08/03");

INSERT INTO video(id, title, dur_seconds, date_upload)
VALUES("002", "TESTE2", 200, "2023/08/03")