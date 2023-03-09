import { events } from "./../../events.config";
import observer from "../../lib/Observer";
import ICalculatorView from "../interface";
import {
  createAdditionalOperationsContainer,
  createButton,
  createButtonContainer,
  createExpressionInput,
  createResultInput,
} from "./utils/elements";
import "./styles.css";
import { Operation } from "../../lib/Calculator";
import { btnClickHandler } from "./utils/handlers";

class CalculatorView implements ICalculatorView {
  container: HTMLDivElement;
  expressionInput: HTMLInputElement;
  resultInput: HTMLInputElement;
  buttons: HTMLButtonElement[];
  additionalOperationsButtons: HTMLButtonElement[];
  additionalOperationsButtonsConatiner: HTMLDivElement;
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

    const { buttons, buttonContainer } = createButtonContainer(this);
    this.buttons = buttons;

    const { buttons: operationButtons, buttonContainer: operationButtonContainer } =
      createAdditionalOperationsContainer(this);
    this.additionalOperationsButtons = operationButtons;
    this.additionalOperationsButtonsConatiner = operationButtonContainer;

    const keysContainer = document.createElement("div");
    keysContainer.classList.add("calculator-keys-container");
    keysContainer.appendChild(operationButtonContainer);
    keysContainer.appendChild(buttonContainer);
    this.container.appendChild(keysContainer);

    // set rest of the observers
    this.#setObservers();
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

  #setObservers() {
    // set event broadcasting for input
    this.expressionInput.addEventListener("input", (e) => {
      observer.notify(events.INPUT_CHANGE, (e?.target as HTMLInputElement).value);
    });

    // if the user presses the "Enter" key on the keyboard fire calcualte event
    this.expressionInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        observer.notify(events.CALCULATE);
      }
    });

    observer.on(events.CALCULATED, (data: string) => {
      this.setResult(data);
    });

    observer.on(events.NEW_OPERATION, (operation: Operation) => {
      const button = createButton(operation.symbol);
      let clickHandler = btnClickHandler(button.value, this);
      button.onclick = clickHandler;
      // buttons.push(button);
      this.additionalOperationsButtonsConatiner.appendChild(button);
    });
  }
}

export default CalculatorView;
