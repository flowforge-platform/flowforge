-- Create worker_tasks table
CREATE TABLE IF NOT EXISTS worker_tasks (
    id UUID PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    payload TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    result TEXT,
    error TEXT,
    workflow_execution_id UUID,
    node_id UUID,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create dead_letter_tasks table
CREATE TABLE IF NOT EXISTS dead_letter_tasks (
    id UUID PRIMARY KEY,
    original_topic VARCHAR(255) NOT NULL,
    task_payload TEXT NOT NULL,
    exception_message TEXT,
    failed_at TIMESTAMP NOT NULL
);