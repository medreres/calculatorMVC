export { Operations, defaultConstants, defaultOperations } from "./dataManipulation";
import { calculatorConfig } from "../../../config";
import CalculatingAlgorithms from "../CalculatingAlgorithms";
export { CalculatingAlgorithms };
export * from "./regex";

// TODO calculatorConfig?.evaluatingAlgorithm is undefined
export const evaluatingAlgorithm = calculatorConfig?.evaluatingAlgorithm || CalculatingAlgorithms.RegularExpression;
