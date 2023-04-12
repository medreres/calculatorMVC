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
