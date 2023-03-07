import Observer from "../lib/Observer";
import CalculatorViewBaseClass from "./interface";

// all new new classes must extend from IC
class CalculatorView extends CalculatorViewBaseClass {
  // model: any;
  container: HTMLDivElement;
  expressionInput: HTMLInputElement;
  resultInput: HTMLInputElement;
  buttonContainer: HTMLDivElement;
  buttons: HTMLButtonElement[];
  constructor() {
    super();
    // this.model = null;
    this.container = document.createElement("div");
    this.container.classList.add("calculator");

    // Create the expression input field
    this.expressionInput = document.createElement("input");
    this.expressionInput.type = "text";
    // this.expressionInput.disabled = true;
    this.container.appendChild(this.expressionInput);
    // attach input from keyboard

    // Create the result input field
    this.resultInput = document.createElement("input");
    this.resultInput.type = "text";
    this.resultInput.disabled = true;
    this.container.appendChild(this.resultInput);

    // Create the button container
    this.buttonContainer = document.createElement("div");
    this.buttonContainer.classList.add("buttons");

    // Create the buttons
    this.buttons = [];
    const buttonValues = [
      ["7", "8", "9", "+"],
      ["4", "5", "6", "-"],
      ["1", "2", "3", "*"],
      ["C", "0", "=", "/"],
    ];

    buttonValues.forEach((row) => {
      const buttonRow = document.createElement("div");
      buttonRow.classList.add("button-row");

      row.forEach((buttonValue) => {
        const button = document.createElement("button");
        button.innerText = buttonValue;
        buttonRow.appendChild(button);
        this.buttons.push(button);
      });

      this.buttonContainer.appendChild(buttonRow);
    });

    // example
    const example = document.createElement("p");
    example.innerHTML = "Example of expression: ( 1 + 2 ) * 3";

    this.container.appendChild(this.buttonContainer);

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

  // setModel(model: any) {
  //   this.model = model;
  // }

  // render() {
  //   this.expressionInput.value = this.model.expression;
  //   this.resultInput.value = this.model.result;
  // }
}

export default CalculatorView;
