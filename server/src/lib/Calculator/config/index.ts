import { calculatorConfig } from "../../../config";
import CalculatingAlgorithms from "../CalculatingAlgorithms";
import Operation from "../utils/Operation";
import { operations, Operations } from "./operations.config";

export { CalculatingAlgorithms, Operations };
export { defaultConstants } from "./constants.config";
export * from "./regex";
export const defaultOperations = operations.map((operation) => new Operation(operation));
export const evaluatingAlgorithm = calculatorConfig?.evaluatingAlgorithm || CalculatingAlgorithms.RegularExpression;
