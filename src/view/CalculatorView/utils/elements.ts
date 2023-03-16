import { events } from "../../../shared/config";
import { buttonValues, Actions } from "../config";
import CalculatorView from "../CalculatorView";
import { btnClickHandler } from "./handlers";
import { Operations } from "../../../lib/Calculator";

export function createExpressionInput(viewInstance: CalculatorView): HTMLInputElement {
  const expressionInput = document.createElement("input");
  expressionInput.classList.add("calculator-screen", "z-depth-1");

  expressionInput.oninput = function (e) {
    if ((this as HTMLInputElement).value.length === 0) {
      viewInstance.notify(events.VIEW_INPUT_CLEARED, (e?.target as HTMLInputElement).value);
      viewInstance.resultInput.value = "";
    } else viewInstance.notify(events.VIEW_INPUT_CHANGED, (e?.target as HTMLInputElement).value);
  };

  expressionInput.onkeydown = (event) => {
    if (event.key === "Enter") {
      viewInstance.notify(events.VIEW_CALCULATE);
    }
  };
  return expressionInput;
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
    Operations.LEFT_PARENTHESIS,
    Operations.RIGHT_PARENTHESIS,
    Operations.EXPONENTIATION,
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
