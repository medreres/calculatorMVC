import { Events } from "../../shared/events";
import CalculatorModel from ".";
import { simpleValidityRegex } from "./regex";
import { AdditionalOperations } from "../../shared/operations";

// TODO refactor
export function initializeObservers(this: CalculatorModel) {
  this.on(Events.MODEL_CALCULATE, () => {
    this.calculate()
      .then((result) => {
        this.notify(Events.MODEL_CALCULATED, result);
      })
      .catch(() => {
        this.notify(Events.MODEL_INVALID_INPUT);
      });
  });

  this.on(Events.MODEL_CHANGE_INPUT, (data: string) => {
    this.setExpression(data);
  });

  this.on(Events.MODEL_OPERATIONS_FETCHED, (data: string[]) => {
    this.operations = data;
  });
}

let validityRegex: RegExp;
export const isInputValid = (expression: string, operators?: string[]) => {
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
