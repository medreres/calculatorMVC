import { Events } from "../../../shared/events";
import CalculatorView from "..";
import { createButton } from "./elements";
import { btnClickHandler } from "./handlers";
import { IConstant } from "../../../shared/interfaces";

export function initializeObservers(this: CalculatorView) {
  this.on(Events.VIEW_SET_RESULT, (value: string) => {
    this.setResult(value);
  });

  this.on(Events.ADD_NEW_CONSTANT, ({ name }: IConstant) => {
    const button = createButton(this, name);
    button.onclick = btnClickHandler(button.value, this);
    this.additionalOperationsButtonsContainer.appendChild(button);
  });
}

export function setInputValidity(input: HTMLInputElement, isValid: boolean): void {
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
