import Observer from "../../lib/Observer";
import ICalculatorView from "../interface";
import { ExpressionInput, ResultInput, ButtonContainer } from "./utils/elements";

class CalculatorView implements ICalculatorView {
  container: HTMLDivElement;
  expressionInput: HTMLInputElement;
  resultInput: HTMLInputElement;
  buttons: HTMLButtonElement[];
  constructor() {
    this.container = document.createElement("div");
    this.container.classList.add("calculator", "d-flex", "flex-column", "my-5");

    const inputContainer = document.createElement("div");
    inputContainer.classList.add("d-flex", "flex-column", "align-items-center");
    this.container.appendChild(inputContainer);

    // attach input from keyboard
    this.expressionInput = new ExpressionInput(inputContainer).expressionInput;

    // Create the result input field
    this.resultInput = new ResultInput(inputContainer).resultInput;

    // Create the button container
    const buttonContainer = new ButtonContainer();
    this.buttons = buttonContainer.buttons;

    // example text
    const example = document.createElement("p");
    example.innerHTML = "Example of expression: ( 1 + 2 ) * 3. Use parentheses to get the priorities right";
    example.classList.add("text-center", "mt-5");
    this.container.appendChild(buttonContainer.buttonContainer);

    this.container.appendChild(example);
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
      let clickHandler;
      if (button.innerHTML === "=")
        clickHandler = () => {
          observer.notify("calculate", button.innerHTML);
        };
      else if (button.innerHTML == "C")
        clickHandler = () => {
          observer.notify("clearExpressionInput");
          this.setExpression("");
          this.setResult("");
        };
      else {
        clickHandler = (e: any) => {
          const data = e.target.innerHTML;
          const isNumber = !isNaN(+data);
          const expression = `${this.expressionInput.value}${isNumber ? "" : " "}${data}${isNumber ? "" : " "}`;
          this.setExpression(expression);
          observer.notify("expressionInputChange", expression);
        };
      }

      button.addEventListener("click", clickHandler);
    });

    // set event broadcasting for input
    this.expressionInput.addEventListener("input", (e: any) => {
      observer.notify("expressionInputChange", e.target.value);
    });

    // evaluate event
    this.expressionInput.addEventListener("keypress", (event: any) => {
      // If the user presses the "Enter" key on the keyboard
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
