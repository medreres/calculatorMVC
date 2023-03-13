import ICalculatorView from "../interface";
import {
  createaCalculatorButtonsContainer,
  createAdditionalOperationsContainer,
  createButtonsContainer,
  createExpressionInput,
  createNewOperationContainer,
  createResultInput,
} from "./utils/elements";
import Observer from "../../lib/Observer";
import { IObserver } from "../../shared/interface";
import { initializeObservers } from "./services";
import "./styles.css";

class CalculatorView implements ICalculatorView, IObserver {
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
    this.expressionInput = createExpressionInput(this);
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
    const addNewOperationContainer = createNewOperationContainer(this);
    this.container.appendChild(addNewOperationContainer);

    // set rest of the observers
    initializeObservers(this);
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

  on(event: string, callback: Function): void {
    this.observer.on(event, callback);
  }

  notify(event: string, data?: any): void {
    this.observer.notify(event, data);
  }

  getView(): HTMLElement {
    return this.container;
  }
}

export default CalculatorView;
