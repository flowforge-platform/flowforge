ALTER TABLE worker_tasks
    ADD COLUMN IF NOT EXISTS workflow_execution_id VARCHAR(36),
    ADD COLUMN IF NOT EXISTS node_id VARCHAR(36);

ALTER TABLE worker_tasks
    ALTER COLUMN payload DROP NOT NULL;
