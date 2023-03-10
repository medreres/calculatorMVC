import Observer from "../../../lib/Observer";
import { events } from "../../../shared/events.config";
import ICalculatorView from "../../interface";
import { buttonValues, operations } from "../buttons.config";
import { addFunctionHandler, btnClickHandler } from "./handlers";

export function createExpressionInput(): HTMLInputElement {
  const observer = new Observer().getInstance();
  const expressionInput = document.createElement("input");
  expressionInput.classList.add("calculator-screen", "z-depth-1");

  // set event broadcasting for input
  expressionInput.oninput = (e) => {
    observer.notify(events.VIEW_INPUT_CHANGED, (e?.target as HTMLInputElement).value);
  };

  // if the user presses the "Enter" key on the keyboard fire calcualte event
  expressionInput.onkeydown = (event) => {
    if (event.key === "Enter") {
      observer.notify(events.VIEW_CALCULATE);
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
  viewInstance: ICalculatorView
): {
  buttons: HTMLButtonElement[];
  buttonsContainer: HTMLDivElement;
} => {
  const buttons: HTMLButtonElement[] = [];
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("calculator-keys");

  buttonValues.forEach((row) =>
    row.forEach((value) => {
      const button = createButton(value);
      // TODO refactor
      let clickHandler = btnClickHandler(button.value, viewInstance);
      buttons.push(button);
      button.onclick = clickHandler;
      buttonsContainer.appendChild(button);
    })
  );

  return { buttons, buttonsContainer };
};

export function createOperation() {
  const addNewOperationContainer = document.createElement("div");
  const modalBtn = document.createElement("button");
  modalBtn.type = "button";
  modalBtn.classList.add("btn", "btn-primary", "m-2", "modal-btn");
  modalBtn.dataset["bsToggle"] = "modal";
  modalBtn.dataset["bsTarget"] = "#exampleModal";
  modalBtn.innerHTML = "Add new operation";
  document.querySelector("#operations-keys")?.appendChild(modalBtn);
  console.log(document.querySelector(".operations-keys"));

  addNewOperationContainer.innerHTML = `
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
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
                <div class="form-group py-1">
                  <input required type="text" class="form-control" id="functionBody" aria-describedby="function body" placeholder="Function body">
                  <small id="emailHelp" class="form-text text-muted">What function returns. JS Math library is supported</small>
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

  addNewOperationContainer.onsubmit = addFunctionHandler;

  return addNewOperationContainer;
}

export function createAdditionalOperationsContainer(viewInstance: ICalculatorView): {
  buttons: HTMLButtonElement[];
  buttonsContainer: HTMLDivElement;
} {
  const additionalOperations: string[] = ["(", ")", "^"];
  const buttons: HTMLButtonElement[] = [];

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("operations-keys");
  buttonsContainer.id = "operations-keys";
  additionalOperations.forEach((value) => {
    const button = createButton(value);
    let clickHandler = btnClickHandler(button.value, viewInstance);
    buttons.push(button);
    button.onclick = clickHandler;
    buttonsContainer.appendChild(button);
  });

  const modalBtn = document.createElement("button");
  modalBtn.type = "button";
  modalBtn.classList.add("btn", "btn-primary", "m-2", "modal-btn");
  modalBtn.dataset["bsToggle"] = "modal";
  modalBtn.dataset["bsTarget"] = "#exampleModal";
  modalBtn.innerHTML = "Add new operation";

  buttonsContainer.appendChild(modalBtn);

  return { buttons, buttonsContainer };
}

export const createButton = (btnValue: string) => {
  const button = document.createElement("button");
  if (!isNaN(+btnValue)) button.classList.add("btn", "btn-light", "waves-effect");
  let innerHtml = null;
  let value = null;
  const classList = [];
  switch (btnValue) {
    case operations.DOT:
      classList.push("calc-btn", "decimal", "function", "btn", "btn-secondary");
      break;

    case operations.CLEAR_INPUT:
      classList.push("calc-btn", "all-clear", "function", "btn", "btn-danger", "btn-sm");
      value = btnValue;
      break;

    case operations.CALCULATE:
      classList.push("calc-btn", "equal-sign", "operator", "btn", "btn-light");
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
  if (classList.length === 0) classList.push("calc-btn", "operator", "btn", "btn-info");
  button.innerHTML = innerHtml ?? btnValue;
  button.value = value ?? btnValue;
  button.classList.add(...classList);

  return button;
};
