import { Operation, operations, calculatorConfig } from "../internal";

// operations for calculation
export const defaultOperations = operations.map((operation) => new Operation(operation));

// algorithm for evaluating expressions
export const evaluatingAlgorithm = calculatorConfig.evaluatingAlgorithm;
