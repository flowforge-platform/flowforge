CREATE TABLE worker_tasks (
    id          VARCHAR(36)  PRIMARY KEY,
    type        VARCHAR(50)  NOT NULL,
    payload     TEXT         NOT NULL,
    status      VARCHAR(20)  NOT NULL DEFAULT 'PENDING',
    result      TEXT,
    error       TEXT,
    created_at  TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);