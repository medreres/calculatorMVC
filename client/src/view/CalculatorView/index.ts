import ICalculatorView from "../interface";
import Observer from "../../lib/Observer";
import { IObserver } from "../../shared/interfaces";
import { initializeObservers } from "./services";
import { Events } from "../../shared/events";
import { createExpressionInput, createToggleScientificViewButton } from "./utils/elements";
import { expressionInputSubmitHandler, expressionInputChangeHandler } from "./utils/elements/keys/handlers";
import {
  createButtonsContainer,
  createAdditionalOperationsContainer,
  createCalculatorButtonsContainer,
} from "./utils/elements/keys/services";
import "./styles.css";

// TODO . is invalid
class CalculatorView implements ICalculatorView, IObserver {
  private observer: Observer = Observer.getInstance();
  protected container: HTMLDivElement;
  protected expressionInput: HTMLInputElement;
  protected buttons: HTMLButtonElement[];
  protected availableOperators: string[] = [];

  constructor() {
    // main wrapper
    this.container = document.createElement("div");
    this.container.classList.add("calculator", "card");

    // expression input
    const { input, wrapper } = createExpressionInput({
      onSubmit: expressionInputSubmitHandler.call(this),
      onChange: expressionInputChangeHandler.call(this),
    });

    this.expressionInput = input;
    this.container.appendChild(wrapper);

    // main buttons
    const { buttons, buttonsContainer } = createButtonsContainer(this);
    this.buttons = buttons;

    // additional operations
    const { buttonsContainer: additionalOperationsContainer } = createAdditionalOperationsContainer.call(this);

    // wrapper for all buttons
    const calculatorButtonsContainer = createCalculatorButtonsContainer(
      buttonsContainer,
      additionalOperationsContainer
    );
    this.container.appendChild(calculatorButtonsContainer);

    const toggleButton = createToggleScientificViewButton();
    this.container.appendChild(toggleButton);

    // set rest of the observers
    initializeObservers.call(this);
  }

  setExpression(expression: string) {
    this.expressionInput.value = expression;
  }

  getExpression(): string {
    return this.expressionInput.value;
  }

  getView(): HTMLElement {
    return this.container;
  }

  on(event: Events, callback: Function): void {
    this.observer.on(event, callback);
  }

  notify(event: Events, data?: any): void {
    this.observer.notify(event, data);
  }
}

export default CalculatorView;
