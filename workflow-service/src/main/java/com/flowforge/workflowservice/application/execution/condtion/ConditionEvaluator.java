package com.flowforge.workflowservice.application.execution.condtion;

import com.fasterxml.jackson.databind.JsonNode;
import com.flowforge.workflowservice.common.exception.BusinessException;
import com.flowforge.workflowservice.common.exception.ErrorCode;
import com.flowforge.workflowservice.presentation.dto.request.ConditionConfig;
import org.springframework.stereotype.Component;

@Component
public class ConditionEvaluator {

    public boolean evaluate(
            JsonNode output,
            ConditionConfig config
    ) {
        String field = config.field();
        ConditionOperator operator = config.operator();
        JsonNode expectedValue = config.value();

        JsonNode actualValue = output.get(field);

        if (actualValue == null || actualValue.isNull()){
            throw new BusinessException(ErrorCode.CONDITION_FIELD_NOT_FOUND);
        }

        return switch(operator) {
            case EQUALS -> actualValue.equals(expectedValue);
            case NOT_EQUALS -> !actualValue.equals(expectedValue);
            case GREATER_THAN -> {
                validateNumeric(actualValue, expectedValue);
                yield actualValue.asDouble() >  expectedValue.asDouble();
            }
            case LESS_THAN -> {
                validateNumeric(actualValue, expectedValue);
                yield actualValue.asDouble() < expectedValue.asDouble();
            }
            case GREATER_OR_EQUAL -> {
                validateNumeric(actualValue, expectedValue);
                yield actualValue.asDouble() >= expectedValue.asDouble();
            }
            case LESS_OR_EQUAL -> {
                validateNumeric(actualValue, expectedValue);
                yield actualValue.asDouble() <= expectedValue.asDouble();
            }
        };
    }

    private void validateNumeric(JsonNode actual, JsonNode expected) {
        if (!actual.isNumber() || !expected.isNumber()) {
            throw new BusinessException(ErrorCode.INVALID_CONDITION_COMPARISON);
        }
    }
}