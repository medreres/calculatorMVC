import { Events } from "../../../shared/events";
import CalculatorView from "..";

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
