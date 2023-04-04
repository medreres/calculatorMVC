import { AdditionalOperations } from "../../config";
import { simpleValidityRegex } from "../regex";
import { createHistoryDropdown } from "./history";
import { setCalculateButtonDisabled } from "./keys";

interface ICreateExpressionInput {
  onSubmit?: (e: KeyboardEvent) => void;
  onChange?: (e: Event) => void;
}
export function createExpressionInput({ onSubmit, onChange }: ICreateExpressionInput) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("d-flex");
  wrapper.style.position = "relative";
  const expressionInput = document.createElement("input");
  expressionInput.autofocus = true;
  expressionInput.classList.add("calculator-screen", "z-depth-1", "form-control");

  wrapper.appendChild(createHistoryDropdown());

  if (onChange) {
    expressionInput.oninput = onChange;
  }

  if (onSubmit) {
    expressionInput.onkeydown = onSubmit;
  }

  wrapper.appendChild(expressionInput);

  return {
    input: expressionInput,
    wrapper,
  };
}

export function setInputValidity(isValid: boolean): void {
  const input = document.querySelector(".calculator-screen") as HTMLInputElement;
  if (isValid) {
    input.classList.remove("is-invalid");
  } else {
    input.classList.add("is-invalid");
  }

  setCalculateButtonDisabled(!isValid);
}

let validityRegex: RegExp;
export const isInputValid = (expression: string, operators?: string[]) => {
  // in case operators are undefined yet
  if (!operators) {
    return !simpleValidityRegex.test(expression);
  }

  // if empty then not valid
  if (!expression) return false;

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
