import { buttonValues, Actions, MainOperations, AdditionalOperations } from "../config";
import CalculatorView from "..";
import { btnClickHandler } from "./handlers";
import { buildUrl } from "../../../utils/buildUrl";
import { BASE_URL } from "../../../config";

interface ICreateExpressionInput {
  onSubmit?: (e: KeyboardEvent) => void;
  onChange?: (e: Event) => void;
}
export function createExpressionInput({ onSubmit, onChange }: ICreateExpressionInput) {
  const wrapper = document.createElement("div");
  const expressionInput = document.createElement("input");
  expressionInput.autofocus = true;
  expressionInput.classList.add("calculator-screen", "z-depth-1", "form-control");

  if (onChange) {
    expressionInput.oninput = onChange;
  }

  if (onSubmit) {
    expressionInput.onkeydown = onSubmit;
  }

  wrapper.appendChild(expressionInput);
  // const feedback = document.createElement("div");
  // feedback.classList.add('invalid-feedback')
  // feedback.innerHTML = 'Looks good!'
  // wrapper.appendChild(feedback);

  return {
    input: expressionInput,
    wrapper,
  };
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
  const buttons: HTMLButtonElement[] = [];

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("calculator-keys", "operations-keys");
  buttonsContainer.style.display = "none";
  buttonsContainer.id = "operations-keys";

  const url = buildUrl("/operations", BASE_URL);

  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      const operationSymbols = [
        ...(Object.values(AdditionalOperations) as string[]),
        ...(response.operations as string[]),
      ];

      const presentOperationSymbols: string[] = Object.values(MainOperations);

      operationSymbols
        .filter((symbol) => !presentOperationSymbols.includes(symbol))
        .forEach((symbol) => {
          const button = createButton(viewInstance, symbol);
          buttons.push(button);
          buttonsContainer.appendChild(button);
        });
    });

  return { buttons, buttonsContainer };
}

export const createButton = (viewInstance: CalculatorView, btnValue: string) => {
  const button = document.createElement("button");
  const classList = [];
  let innerHtml = null;
  let value = null;

  switch (btnValue) {
    case Actions.DOT:
      classList.push("calc-btn", "decimal", "function", "btn", "btn-secondary");
      break;

    case Actions.CLEAR_INPUT:
      classList.push("calc-btn", "all-clear", "function", "btn", "btn-danger", "btn-sm");
      value = btnValue;
      break;

    case Actions.CALCULATE:
      classList.push("calc-btn", "equal-sign", "operator", "btn", "btn-light");
      button.disabled = true;
      break;

    case MainOperations.MULTIPLICATION:
      innerHtml = "&times;";
      value = MainOperations.MULTIPLICATION;
      break;

    case MainOperations.DIVISION:
      innerHtml = "&divide";
      value = MainOperations.DIVISION;
      break;

    case Actions.REMOVE_SYMBOL:
      classList.push("calc-btn", "operator", "btn", "btn-info", "remove-btn");
      break;

    case "0":
      classList.push("calc-btn", "operator", "btn", "btn-info", "zero-btn");
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

export function createToggleScientificViewButton() {
  const scientificView = document.createElement("button");
  scientificView.innerHTML = "Scientific";
  scientificView.style.marginLeft = "auto";
  scientificView.classList.add("btn", "btn-info");
  scientificView.style.marginRight = "auto";
  scientificView.onclick = (e) => {
    const container = document.querySelector("#operations-keys") as HTMLDivElement;
    const currentStyle = container.style.display;
    if (currentStyle === "none") {
      container.style.display = "grid";
      (e.target as HTMLButtonElement).innerHTML = "Regular";
    } else {
      container.style.display = "none";
      (e.target as HTMLButtonElement).innerHTML = "Scientific";
    }
  };

  return scientificView;
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
