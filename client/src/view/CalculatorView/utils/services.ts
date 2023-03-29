import { Events } from "../../../shared/events";
import CalculatorView from "..";
import { simpleValidityRegex } from "./regex";
import { AdditionalOperations } from "../config";

export function initializeObservers(this: CalculatorView) {
  this.on(Events.VIEW_SET_RESULT, (value: string) => {
    this.setExpression(value);
  });

  this.on(Events.VIEW_INVALID_INPUT, () => {
    setInputValidity(false);
    toggleCalculateButton(true);
  });
}

export function setInputValidity(isValid: boolean): void {
  const input = document.querySelector(".calculator-screen") as HTMLInputElement;
  if (isValid) {
    input.classList.remove("is-invalid");
  } else {
    input.classList.add("is-invalid");
  }

  toggleCalculateButton(!isValid);
}

export function toggleCalculateButton(disabled: boolean) {
  const calcBtn = document.querySelector(".equal-sign") as HTMLButtonElement;
  calcBtn.disabled = disabled;
}

let validityRegex: RegExp;
export const isInputValid = (expression: string, operators?: string[]) => {
  // in case operators are undefined yet
  if (!operators) {
    return !simpleValidityRegex.test(expression);
  }

  // if regex is already initialized, then use it
  if (!validityRegex) {
    // take all one symbol length operators make regex out of them
    let operatorsRegexRaw = operators
      .filter((operator) => operator.length === 1)
      .map((operator) => `\\${operator}`)
      .join("");

    const { LEFT_PARENTHESES, RIGHT_PARENTHESES } = AdditionalOperations;
    // initialize regex for future usage
    validityRegex = new RegExp(`[^\\w\\s${LEFT_PARENTHESES}${RIGHT_PARENTHESES}${operatorsRegexRaw}]`);
  }

  return !validityRegex.test(expression);
};
