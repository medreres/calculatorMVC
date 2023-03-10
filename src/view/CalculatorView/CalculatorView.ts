import { events } from "../../shared/events.config";
import ICalculatorView from "../interface";
import {
  createAdditionalOperationsContainer,
  createButton,
  createButtonsContainer,
  createExpressionInput,
  createOperation,
  createResultInput,
} from "./utils/elements";
import { btnClickHandler } from "./utils/handlers";
import Observer from "../../lib/Observer";
import "./styles.css";
import { clearModalInput } from "./utils/helper";

// TODO tests
class CalculatorView implements ICalculatorView {
  container: HTMLDivElement;
  expressionInput: HTMLInputElement;
  resultInput: HTMLInputElement;
  buttons: HTMLButtonElement[];
  additionalOperationsButtons: HTMLButtonElement[];
  additionalOperationsButtonsConatiner: HTMLDivElement;
  private observer: Observer = new Observer().getInstance();

  constructor() {
    // main wrapper
    this.container = document.createElement("div");
    this.container.classList.add("calculator", "card");

    // expression input
    this.expressionInput = createExpressionInput();
    this.container.appendChild(this.expressionInput);

    // result input
    this.resultInput = createResultInput();
    this.container.appendChild(this.resultInput);

    const { buttons, buttonsContainer } = createButtonsContainer(this);
    this.buttons = buttons;

    const { buttons: operationButtons, buttonsContainer: operationButtonsContainer } =
      createAdditionalOperationsContainer(this);
    this.additionalOperationsButtons = operationButtons;
    this.additionalOperationsButtonsConatiner = operationButtonsContainer;

    const keysContainer = document.createElement("div");
    keysContainer.classList.add("calculator-keys-container");
    keysContainer.appendChild(operationButtonsContainer);
    keysContainer.appendChild(buttonsContainer);
    this.container.appendChild(keysContainer);

    const addNewOperationContainer = createOperation();

    this.container.appendChild(addNewOperationContainer);

    // set rest of the observers
    this.setObservers();
  }

  setExpression(expression: string) {
    this.expressionInput.value = expression;
  }

  getExpression(): string {
    return this.expressionInput.value;
  }

  setResult(result: string) {
    this.resultInput.value = result;
  }

  private setObservers() {
    this.observer.on(events.VIEW_SET_RESULT, (value: string) => {
      this.setResult(value);
    });

    this.observer.on(events.VIEW_ADD_BUTTON, (symbol: string) => {
      const button = createButton(symbol);
      let clickHandler = btnClickHandler(button.value, this);
      button.onclick = clickHandler;
      this.additionalOperationsButtonsConatiner.appendChild(button);

      // close open modal for adding operation
      (document.querySelector("#closeModal") as HTMLButtonElement).click();

      // clear inputs
      clearModalInput();
    });

    this.observer.on(events.VIEW_ADDING_INVALID_OPERATION, () => {
      alert("Function is invalid");
    });
  }
}

export default CalculatorView;
