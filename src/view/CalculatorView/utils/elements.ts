import { buttonValues, Actions } from "../config";
import CalculatorView from "..";
import { btnClickHandler } from "./handlers";
import { defaultConstants, Operations } from "../../../lib/Calculator";

interface ICreateExpressionInput {
  onSubmit?: (e: KeyboardEvent) => void;
  onChange?: (e: Event) => void;
}
export function createExpressionInput({ onSubmit, onChange }: ICreateExpressionInput) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("col-md-12");
  const expressionInput = document.createElement("input");
  expressionInput.classList.add("calculator-screen", "z-depth-1", "form-control");

  if (onChange) {
    expressionInput.oninput = onChange;
  }

  if (onSubmit) {
    expressionInput.onkeydown = onSubmit;
  }

  wrapper.appendChild(expressionInput);
  return {
    wrapper,
    input: expressionInput,
  };
}

export function createResultInput(): HTMLInputElement {
  const resultInput = document.createElement("input");
  resultInput.classList.add("result-screen", "z-depth-1", "fs-3");
  resultInput.disabled = true;
  return resultInput;
}

export const createButtonsContainer = (
  viewInstance: CalculatorView
): {
  buttons: HTMLButtonElement[];
  buttonsContainer: HTMLDivElement;
} => {
  const buttons: HTMLButtonElement[] = [];
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("calculator-keys");

  buttonValues.forEach((row) =>
    row.forEach((value) => {
      const button = createButton(viewInstance, value);
      buttons.push(button);
      buttonsContainer.appendChild(button);
    })
  );

  return { buttons, buttonsContainer };
};

export function createAdditionalOperationsContainer(viewInstance: CalculatorView): {
  buttons: HTMLButtonElement[];
  buttonsContainer: HTMLDivElement;
} {
  const additionalOperations: string[] = [
    ...Object.values(Operations).filter((operation) => operation != Operations.DOT),
    ...Object.keys(defaultConstants),
  ];
  const buttons: HTMLButtonElement[] = [];

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("operations-keys");
  buttonsContainer.id = "operations-keys";
  additionalOperations.forEach((value) => {
    const button = createButton(viewInstance, value);
    buttons.push(button);
    buttonsContainer.appendChild(button);
  });

  return { buttons, buttonsContainer };
}

export const createButton = (viewInstance: CalculatorView, btnValue: string) => {
  const button = document.createElement("button");
  const classList = [];
  let innerHtml = null;
  let value = null;

  switch (btnValue) {
    case Operations.DOT:
      classList.push("calc-btn", "decimal", "function", "btn", "btn-secondary");
      break;

    case Actions.CLEAR_INPUT:
      classList.push("calc-btn", "all-clear", "function", "btn", "btn-danger", "btn-sm");
      value = btnValue;
      break;

    case Actions.CALCULATE:
      classList.push("calc-btn", "equal-sign", "operator", "btn", "btn-light");
      break;

    case Operations.MULTIPLICATION:
      innerHtml = "&times;";
      value = Operations.MULTIPLICATION;
      break;

    case Operations.DIVISION:
      innerHtml = "&divide";
      value = Operations.DIVISION;
      break;

    case Actions.REMOVE_SYMBOL:
      classList.push("calc-btn", "operator", "btn", "btn-info", "remove-btn");
      break;
  }

  // if inner html and value haven't been set, set to default
  if (classList.length === 0) classList.push("calc-btn", "operator", "btn", "btn-info");

  if (!isNaN(+btnValue)) button.classList.add("btn", "btn-light", "waves-effect");

  button.onclick = btnClickHandler(btnValue, viewInstance);
  button.innerHTML = innerHtml ?? btnValue;
  button.value = value ?? btnValue;
  button.classList.add(...classList);

  return button;
};

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
