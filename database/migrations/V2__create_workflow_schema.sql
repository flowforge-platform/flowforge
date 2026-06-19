CREATE TABLE workflows (
                           id BIGSERIAL PRIMARY KEY,

                           organization_id UUID NOT NULL,

                           created_by UUID NOT NULL,

                           name VARCHAR(255) NOT NULL,

                           description TEXT,

                           status VARCHAR(50) NOT NULL,

                           created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                           updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                           CONSTRAINT fk_workflow_organization
                               FOREIGN KEY (organization_id)
                                   REFERENCES organizations(id),

                           CONSTRAINT fk_workflow_created_by
                               FOREIGN KEY (created_by)
                                   REFERENCES users(id)
);

CREATE TABLE workflow_nodes (
                                id BIGSERIAL PRIMARY KEY,

                                workflow_id BIGINT NOT NULL,

                                node_key VARCHAR(100) NOT NULL,

                                node_type VARCHAR(50) NOT NULL,

                                config_json JSONB,

                                position_x DOUBLE PRECISION,

                                position_y DOUBLE PRECISION,

                                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                                CONSTRAINT fk_node_workflow
                                    FOREIGN KEY (workflow_id)
                                        REFERENCES workflows(id)
                                        ON DELETE CASCADE
);

CREATE TABLE workflow_edges (
                                id BIGSERIAL PRIMARY KEY,

                                workflow_id BIGINT NOT NULL,

                                source_node_id BIGINT NOT NULL,

                                target_node_id BIGINT NOT NULL,

                                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                                CONSTRAINT fk_edge_workflow
                                    FOREIGN KEY (workflow_id)
                                        REFERENCES workflows(id)
                                        ON DELETE CASCADE,

                                CONSTRAINT fk_edge_source
                                    FOREIGN KEY (source_node_id)
                                        REFERENCES workflow_nodes(id)
                                        ON DELETE CASCADE,

                                CONSTRAINT fk_edge_target
                                    FOREIGN KEY (target_node_id)
                                        REFERENCES workflow_nodes(id)
                                        ON DELETE CASCADE
);

CREATE TABLE workflow_executions (
                                     id BIGSERIAL PRIMARY KEY,

                                     workflow_id BIGINT NOT NULL,

                                     organization_id UUID NOT NULL,

                                     started_by UUID NOT NULL,

                                     status VARCHAR(50) NOT NULL,

                                     started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                                     completed_at TIMESTAMP,

                                     CONSTRAINT fk_execution_workflow
                                         FOREIGN KEY (workflow_id)
                                             REFERENCES workflows(id),

                                     CONSTRAINT fk_execution_organization
                                         FOREIGN KEY (organization_id)
                                             REFERENCES organizations(id),

                                     CONSTRAINT fk_execution_started_by
                                         FOREIGN KEY (started_by)
                                             REFERENCES users(id)
);

CREATE TABLE task_executions (
                                 id BIGSERIAL PRIMARY KEY,

                                 workflow_execution_id BIGINT NOT NULL,

                                 node_id BIGINT NOT NULL,

                                 status VARCHAR(50) NOT NULL,

                                 retry_count INTEGER NOT NULL DEFAULT 0,

                                 started_at TIMESTAMP,

                                 completed_at TIMESTAMP,

                                 error_message TEXT,

                                 CONSTRAINT fk_task_execution_workflow_execution
                                     FOREIGN KEY (workflow_execution_id)
                                         REFERENCES workflow_executions(id)
                                         ON DELETE CASCADE,

                                 CONSTRAINT fk_task_execution_node
                                     FOREIGN KEY (node_id)
                                         REFERENCES workflow_nodes(id)
);
