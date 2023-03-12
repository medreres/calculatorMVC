import Observer from "../../../lib/Observer";
import { events } from "../../../shared/config";
import { buttonValues, Actions } from "../config";
import CalculatorView from "../CalculatorView";
import { addFunctionHandler, btnClickHandler } from "./handlers";
import { Operations } from "../../../lib/Calculator";

export function createExpressionInput(viewInstance: CalculatorView): HTMLInputElement {
  const observer = new Observer().getInstance();
  const expressionInput = document.createElement("input");
  expressionInput.classList.add("calculator-screen", "z-depth-1");

  // set event broadcasting for input
  expressionInput.oninput = (e) => {
    viewInstance.notify(events.VIEW_INPUT_CHANGED, (e?.target as HTMLInputElement).value);
  };

  // if the user presses the "Enter" key on the keyboard fire calcualte event
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

export function createNewOperation(viewInstance: CalculatorView) {
  const addNewOperationContainer = document.createElement("div");
  addNewOperationContainer.onsubmit = addFunctionHandler(viewInstance);
  // TODO add js syntax highlight for better user experience
  // TODO save added operations in local storage
  // TODO removable and editable operations
  addNewOperationContainer.innerHTML = `
    <!-- Modal -->
    <div class="modal fade" id="addOperationModal" tabindex="-1" aria-labelledby="add operation modal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="addOperationModalLabel">Add Operation</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form>
            <div class="modal-body">
                <div class="form-group py-1">
                  <input required type="text" class="form-control" id="functionSymbol" aria-describedby="Function symbol" placeholder="Function symbol">
                </div>
                <div class="form-group py-1">
                  <input required type="number" class="form-control" id="functionPrecedence" aria-describedby="function precedence" placeholder="Function precedence">
                </div>
                <div class="form-group py-1">
                  <input type="text" class="form-control" id="functionArguments" aria-describedby="function arguments" placeholder="Function arguments">
                  <small id="emailHelp" class="form-text text-muted">For example: a,b. Could be empty</small>
                </div>
                <div class="form-outline py-1">
                  <textarea required type="text" class="form-control" id="functionBody" aria-describedby="function body" placeholder="Function body"></textarea>
                  <small id="emailHelp" class="form-text text-muted">Declaration of function body using JavaScript. Must include return statement and make use of arguments declared above</small>
                </div>
                </div>
                <div class="modal-footer">
                  <button id='closeModal' type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-primary">Add operation</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  `;

  const modalBtn = document.createElement("button");
  modalBtn.type = "button";
  modalBtn.classList.add("btn", "btn-primary", "m-2", "modal-btn");
  modalBtn.dataset["bsToggle"] = "modal";
  modalBtn.dataset["bsTarget"] = "#addOperationModal";
  modalBtn.innerHTML = "Add new operation";
  viewInstance.additionalOperationsButtonsConatiner.appendChild(modalBtn);

  return addNewOperationContainer;
}

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

export const createaCalculatorButtonsContainer = (
  buttonsContainer: HTMLDivElement,
  additionalOperationsContainer: HTMLDivElement
): HTMLDivElement => {
  const calculatorButtonsContainer = document.createElement("div");
  calculatorButtonsContainer.classList.add("calculator-keys-container");
  calculatorButtonsContainer.appendChild(additionalOperationsContainer);
  calculatorButtonsContainer.appendChild(buttonsContainer);

  return calculatorButtonsContainer;
};
