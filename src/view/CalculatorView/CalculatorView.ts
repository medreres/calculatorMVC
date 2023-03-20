import ICalculatorView from "../interface";
import {
  createCalculatorButtonsContainer,
  createAdditionalOperationsContainer,
  createButtonsContainer,
  createExpressionInput,
  createResultInput,
} from "./utils/elements";
import Observer from "../../lib/Observer";
import { IObserver } from "../../shared/interface";
import { initializeObservers } from "./services";
import { Events } from "../../shared/events";
import { expressionInputChangeHandler, expressionInputSubmitHandler } from "./utils/handlers";
import "./styles.css";

// TODO change view to more beautiful
// TODO warnings in console
class CalculatorView implements ICalculatorView, IObserver {
  container: HTMLDivElement;
  expressionInput: HTMLInputElement;
  resultInput: HTMLInputElement;
  buttons: HTMLButtonElement[];
  additionalOperationsButtons: HTMLButtonElement[];
  additionalOperationsButtonsContainer: HTMLDivElement;
  private observer: Observer = new Observer().getInstance();

  constructor() {
    // main wrapper
    this.container = document.createElement("div");
    this.container.classList.add("calculator", "card");

    // expression input
    const onSubmit = expressionInputSubmitHandler(this);
    const onChange = expressionInputChangeHandler(this);
    this.expressionInput = createExpressionInput({
      onSubmit,
      onChange,
    });
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
    this.additionalOperationsButtonsContainer = additionalOperationsContainer;

    // wrapper for all buttons
    const calculatorButtonsContainer = createCalculatorButtonsContainer(
      buttonsContainer,
      additionalOperationsContainer
    );
    this.container.appendChild(calculatorButtonsContainer);

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

  on(event: Events, callback: Function): void {
    this.observer.on(event, callback);
  }

  notify(event: Events, data?: any): void {
    this.observer.notify(event, data);
  }

  getView(): HTMLElement {
    return this.container;
  }
}

export default CalculatorView;
