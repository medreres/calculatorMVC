class CalculatorView {
  model: any;
  container: HTMLDivElement;
  expressionInput: HTMLInputElement;
  resultInput: HTMLInputElement;
  buttonContainer: HTMLDivElement;
  buttons: HTMLButtonElement[];
  constructor() {
    this.model = null;
    this.container = document.createElement("div");
    this.container.classList.add("calculator");

    // Create the expression input field
    this.expressionInput = document.createElement("input");
    this.expressionInput.type = "text";
    // this.expressionInput.disabled = true;
    this.container.appendChild(this.expressionInput);
    // attach input from keyboard
    this.expressionInput.addEventListener("input", () => {
      this.model.setExpression(this.expressionInput.value);
    });

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
        button.addEventListener('click', () => {
          // this.model.setExpression()
        })
        this.buttons.push(button);
      });

      this.buttonContainer.appendChild(buttonRow);
    });

    // example
    const example = document.createElement("p");
    example.innerHTML = 'Example of expression: ( 1 + 2 ) * 3'
    
    this.container.appendChild(this.buttonContainer);
    
    this.container.appendChild(example)
  }

  setModel(model: any) {
    this.model = model;
  }

  render() {
    this.expressionInput.value = this.model.expression;
    this.resultInput.value = this.model.result;
  }
}

export default CalculatorView;
