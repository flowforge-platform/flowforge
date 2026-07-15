CREATE TABLE worker_tasks (
    id                      UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_execution_id   UUID,
    node_id                 UUID,
    type                    VARCHAR(50)  NOT NULL,
    payload                 TEXT,
    status                  VARCHAR(20)  NOT NULL DEFAULT 'PENDING',
    result                  TEXT,
    error                   TEXT,
    created_at              TIMESTAMP,
    updated_at              TIMESTAMP
);

CREATE TABLE dead_letter_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    original_topic VARCHAR(255) NOT NULL,
    task_payload TEXT NOT NULL,
    exception_message TEXT,
    failed_at TIMESTAMP NOT NULL
);