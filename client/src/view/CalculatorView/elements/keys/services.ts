import { getButtonClasses, getInnerHtml, createButton } from ".";
import CalculatorView from "../..";
import { buttonValues, Actions } from "../../config";
import { btnClickHandler } from "../../utils/handlers";
import { ICreateButton } from "./interface";

interface ButtonsContainer {
  buttons: HTMLButtonElement[];
  buttonsContainer: HTMLDivElement;
}
export const createButtonsContainer = (viewInstance: CalculatorView): ButtonsContainer => {
  const buttons: HTMLButtonElement[] = [];
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("calculator-keys");

  buttonValues.forEach((row) =>
    row.forEach((value) => {
      const onClick = btnClickHandler.call(viewInstance, value);
      const classList = getButtonClasses(value);
      const innerHtml = getInnerHtml(value);
      const params: ICreateButton = {
        onClick,
        classList,
        value,
        innerHtml,
        disabled: value === Actions.CALCULATE ? true : false,
      };
      const button = createButton(params);
      buttons.push(button);
      buttonsContainer.appendChild(button);
    })
  );

  return { buttons, buttonsContainer };
};

export function setCalculateButtonDisabled(disabled: boolean) {
  const calcBtn = document.querySelector(".equal-sign") as HTMLButtonElement;
  calcBtn.disabled = disabled;
}

export const createCalculatorButtonsContainer = (
  buttonsContainer: HTMLDivElement,
  additionalOperationsContainer: HTMLDivElement
): HTMLDivElement => {
  const calculatorButtonsContainer = document.createElement("div");
  calculatorButtonsContainer.classList.add("calculator-keys-container");
  calculatorButtonsContainer.appendChild(additionalOperationsContainer);
  calculatorButtonsContainer.appendChild(buttonsContainer);

  return calculatorButtonsContainer;
};

export function createAdditionalOperationsContainer(this: CalculatorView): ButtonsContainer {
  const buttons: HTMLButtonElement[] = [];

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("calculator-keys", "operations-keys");
  buttonsContainer.style.display = "none";
  buttonsContainer.id = "operations-keys";

  return { buttons, buttonsContainer };
}

export function addOperationButton(button: HTMLButtonElement) {
  document.querySelector("#operations-keys")?.appendChild(button);
}
