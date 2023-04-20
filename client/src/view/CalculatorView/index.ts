import Observer from "@/lib/Observer";
import { IViewEvents } from "@/shared";
import ICalculatorView from "../interface";
import {
  createExpressionInput,
  expressionInputSubmitHandler,
  expressionInputChangeHandler,
  createMainButtons,
  createAdditionalButtons,
  createButtonsContainer,
  createScientificViewButton,
} from "./elements";
import { initializeObservers } from "./services";
import "./styles.css";

class CalculatorView implements ICalculatorView {
  private observer: Observer = Observer.getInstance();
  protected container: HTMLDivElement;
  protected expressionInput: HTMLInputElement;
  protected buttons: HTMLButtonElement[];
  protected availableOperators: string[] = [];

  constructor() {
    // expression input
    const { input, wrapper } = createExpressionInput({
      onSubmit: expressionInputSubmitHandler.call(this),
      onChange: expressionInputChangeHandler.call(this),
    });
    this.expressionInput = input;

    // main buttons
    const { buttons, buttonsContainer } = createMainButtons(this);
    this.buttons = buttons;

    // additional operations
    const { buttonsContainer: additionalOperationsContainer } = createAdditionalButtons.call(this);

    // wrapper for all buttons
    const calculatorButtonsContainer = createButtonsContainer(buttonsContainer, additionalOperationsContainer);

    const scientificButton = createScientificViewButton();

    // main wrapper
    this.container = document.createElement("div");
    this.container.classList.add("calculator", "card");

    // add all elements to the container
    this.container.appendChild(wrapper);
    this.container.appendChild(calculatorButtonsContainer);
    this.container.appendChild(scientificButton);

    // set rest of the observers
    initializeObservers.call(this);
  }

  setExpression(expression: string) {
    this.expressionInput.value = expression;
  }

  getExpression(): string {
    return this.expressionInput.value;
  }

  on<EventName extends keyof IViewEvents>(event: EventName, callback: (arg: IViewEvents[EventName]) => void): void {
    this.observer.on(event, callback);
  }

  notify<EventName extends keyof IViewEvents>(event: EventName, data?: IViewEvents[EventName]): void {
    this.observer.notify(event, data);
  }

  render() {
    document.body.appendChild(this.container);
  }
}

export default CalculatorView;
