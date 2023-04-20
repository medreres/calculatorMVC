import { AdditionalOperations } from "@/shared";
import CalculatorModel from "..";
import { simpleValidityRegex } from "./regex";

let validityRegex: RegExp;
export const isInputValid = (expression: string, operators?: string[]): boolean => {
  // in case operators are undefined yet
  if (!operators) {
    return !simpleValidityRegex.test(expression);
  }

  // if regex is already initialized, then use it in order not to create it each time
  if (!validityRegex) {
    // take all one symbol length operators make regex out of them
    let operatorsRegexRaw = operators
      .filter((operator) => operator.length === 1)
      .map((operator) => `\\${operator}`)
      .join("");

    const { LEFT_PARENTHESES, RIGHT_PARENTHESES } = AdditionalOperations;
    // initialize regex for future usage
    validityRegex = new RegExp(`[^\\.\\w\\s${LEFT_PARENTHESES}${RIGHT_PARENTHESES}${operatorsRegexRaw}]`);
  }

  return !validityRegex.test(expression);
};

export function containsOperations(this: CalculatorModel, expression: string): boolean {
  const regexRaw = this.operations
    .map((operation) => {
      if (operation.length > 1) {
        return operation;
      } else {
        return `\\${operation}`;
      }
    })
    .join("|");

  const regex = new RegExp(regexRaw);
  return regex.test(expression);
}
