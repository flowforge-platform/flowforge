package com.flowforge.workflowservice.application.execution.condtion;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.flowforge.workflowservice.domain.edge.BranchType;
import com.flowforge.workflowservice.domain.node.WorkflowNode;
import com.flowforge.workflowservice.presentation.dto.request.ConditionConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ConditionExecutionService {
    private final ObjectMapper objectMapper;
    private final ConditionEvaluator conditionEvaluator;

    public BranchType execute(
            JsonNode previousTaskOutput,
            WorkflowNode conditionNode
    ){
        ConditionConfig config = objectMapper.convertValue(
                conditionNode.getConfiguration(),
                ConditionConfig.class
        );

        boolean result = conditionEvaluator.evaluate(previousTaskOutput,config);
        return result
                ? BranchType.TRUE
                : BranchType.FALSE;
    }
}
