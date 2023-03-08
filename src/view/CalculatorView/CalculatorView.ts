import Observer from "../../lib/Observer";
import ICalculatorView from "../interface";
import { ButtonContainer, ExpressionInput, ResultInput } from "./utils/elements";
import { btnClickHandler } from "./utils/handlers";
import "./styles.css";

class CalculatorView implements ICalculatorView {
  container: HTMLDivElement;
  expressionInput: HTMLInputElement;
  resultInput: HTMLInputElement;
  buttons: HTMLButtonElement[];
  constructor() {
    // main wrapper
    this.container = document.createElement("div");
    this.container.classList.add("calculator", "card");

    // expression input
    this.expressionInput = ExpressionInput();
    this.container.appendChild(this.expressionInput);

    // result input
    this.resultInput = ResultInput();
    this.container.appendChild(this.resultInput);

    const { buttons, buttonContainer } = ButtonContainer();
    this.buttons = buttons;
    this.container.appendChild(buttonContainer);
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

  setObservers(observer: Observer) {
    // set event broadcasting for button clicks
    this.buttons.forEach((button) => {
      let clickHandler = btnClickHandler(button.innerHTML, this, observer);
      button.addEventListener("click", clickHandler);
    });

    // set event broadcasting for input
    this.expressionInput.addEventListener("input", (e: any) => {
      observer.notify("expressionInputChange", e.target.value);
    });

    // if the user presses the "Enter" key on the keyboard fire calcualte event
    this.expressionInput.addEventListener("keypress", (event: any) => {
      if (event.key === "Enter") {
        observer.notify("calculate");
      }
    });

    observer.on("calculated", (data: string) => {
      this.setResult(data);
    });
  }
}

export default CalculatorView;
