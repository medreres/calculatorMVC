import { events } from "../../shared/events.config";
import ICalculatorView from "../interface";
import {
  createaCalculatorButtonsContainer,
  createAdditionalOperationsContainer,
  createButton,
  createButtonsContainer,
  createExpressionInput,
  createNewOperation,
  createResultInput,
} from "./utils/elements";
import { btnClickHandler } from "./utils/handlers";
import Observer from "../../lib/Observer";
import { clearModalInput } from "./utils/helper";
import "./styles.css";

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

    // main buttons
    const { buttons, buttonsContainer } = createButtonsContainer(this);
    this.buttons = buttons;

    // additional operations
    const { buttons: operationButtons, buttonsContainer: additionalOperationsContainer } =
      createAdditionalOperationsContainer(this);
    this.additionalOperationsButtons = operationButtons;
    this.additionalOperationsButtonsConatiner = additionalOperationsContainer;

    // wrapper for all buttons
    const calculatorButtonsContainer = createaCalculatorButtonsContainer(
      buttonsContainer,
      additionalOperationsContainer
    );
    this.container.appendChild(calculatorButtonsContainer);

    // create new operation
    const addNewOperationContainer = createNewOperation(this);
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
      const button = createButton(this, symbol);
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
