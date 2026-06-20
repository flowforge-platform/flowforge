CREATE TABLE organizations (
                               id UUID PRIMARY KEY,

                               name VARCHAR(255) NOT NULL UNIQUE,

                               created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
                       id UUID PRIMARY KEY,

                       full_name VARCHAR(255) NOT NULL,

                       email VARCHAR(255) NOT NULL UNIQUE,

                       password VARCHAR(255) NOT NULL,

                       role VARCHAR(50) NOT NULL,

                       organization_id UUID NOT NULL,

                       created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                       CONSTRAINT fk_users_organization
                           FOREIGN KEY (organization_id)
                               REFERENCES organizations(id)
);

CREATE TABLE invitations (
                             id UUID PRIMARY KEY,

                             token VARCHAR(255) NOT NULL UNIQUE,

                             email VARCHAR(255) NOT NULL,

                             role VARCHAR(50) NOT NULL,

                             status VARCHAR(50) NOT NULL,

                             organization_id UUID NOT NULL,

                             expires_at TIMESTAMP NOT NULL,

                             created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                             CONSTRAINT fk_invitations_organization
                                 FOREIGN KEY (organization_id)
                                     REFERENCES organizations(id)
);