package com.flowforge.workflowservice.application.workflow;


import com.flowforge.workflowservice.domain.workflow.Workflow;
import com.flowforge.workflowservice.presentation.dto.WorkflowResponse;
import org.springframework.stereotype.Component;

@Component
public class WorkflowMapper {

    public WorkflowResponse toResponse(Workflow workflow) {

        return new WorkflowResponse(
                workflow.getId(),
                workflow.getOrganizationId(),
                workflow.getCreatedBy(),
                workflow.getName(),
                workflow.getDescription(),
                workflow.getStatus().name(),
                workflow.getCreatedAt(),
                workflow.getUpdatedAt()
        );
    }
}