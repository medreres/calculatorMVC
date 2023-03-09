import ICalculatorView from "../../interface";
import { buttonValues, operations } from "../buttons.config";
import { btnClickHandler } from "./handlers";

export function createExpressionInput(): HTMLInputElement {
  const expressionInput = document.createElement("input");
  expressionInput.classList.add("calculator-screen", "z-depth-1");
  return expressionInput;
}

export function createResultInput(): HTMLInputElement {
  const resultInput = document.createElement("input");
  resultInput.classList.add("result-screen", "z-depth-1", "fs-3");
  resultInput.disabled = true;
  return resultInput;
}

export const createButtonContainer = (viewInstance: ICalculatorView) => {
  const buttons: HTMLButtonElement[] = [];
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("calculator-keys");

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("calculator-keys");
  buttonValues.forEach((row) =>
    row.forEach((value) => {
      const button = createButton(value);
      let clickHandler = btnClickHandler(button.value, viewInstance);
      buttons.push(button);
      button.onclick = clickHandler;
      buttonContainer.appendChild(button);
    })
  );

  return { buttons, buttonContainer };
};

// TODO vert similar functions
export function createAdditionalOperationsContainer(viewInstance: ICalculatorView): {
  buttons: HTMLButtonElement[];
  buttonContainer: HTMLDivElement;
} {
  const additionalOperations: string[] = [];
  const buttons: HTMLButtonElement[] = [];
  // const buttonsContainer = document.createElement("div");
  // buttonsContainer.classList.add("operations-keys");

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("operations-keys");
  // buttonValues.forEach((row) =>
  additionalOperations.forEach((value) => {
    const button = createButton(value);
    let clickHandler = btnClickHandler(button.value, viewInstance);
    buttons.push(button);
    button.onclick = clickHandler;
    buttonContainer.appendChild(button);
  });
  // );

  return { buttons, buttonContainer };
}

export const createButton = (btnValue: string) => {
  const button = document.createElement("button");
  if (!isNaN(+btnValue)) button.classList.add("btn", "btn-light", "waves-effect");
  let innerHtml = null;
  let value = null;
  const classList = [];
  switch (btnValue) {
    case operations.DOT:
      classList.push("decimal", "function", "btn", "btn-secondary");
      break;

    case operations.CLEAR_INPUT:
      classList.push("all-clear", "function", "btn", "btn-danger", "btn-sm");
      value = btnValue;
      break;

    case operations.CALCULATE:
      classList.push("equal-sign", "operator", "btn", "btn-light");
      break;

    case operations.MULTIPLICATION:
      innerHtml = "&times;";
      value = operations.MULTIPLICATION;
      break;

    case operations.DIVISION:
      innerHtml = "&divide";
      value = operations.DIVISION;
      break;
  }

  // if inner html and value haven't been set, set to default
  if (classList.length === 0) classList.push("operator", "btn", "btn-info");
  button.innerHTML = innerHtml ?? btnValue;
  button.value = value ?? btnValue;
  button.classList.add(...classList);

  return button;
};
