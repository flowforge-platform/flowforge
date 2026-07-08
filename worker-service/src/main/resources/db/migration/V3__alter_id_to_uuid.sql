
ALTER TABLE worker_tasks
    ALTER COLUMN id TYPE UUID USING id::uuid,
    ALTER COLUMN workflow_execution_id TYPE UUID USING workflow_execution_id::uuid,
    ALTER COLUMN node_id TYPE UUID USING node_id::uuid;

CREATE TABLE IF NOT EXISTS dead_letter_tasks (
    id UUID PRIMARY KEY,
    original_topic VARCHAR(255) NOT NULL,
    task_payload TEXT NOT NULL,
    exception_message TEXT,
    failed_at TIMESTAMP NOT NULL
);
