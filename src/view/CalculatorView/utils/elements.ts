export class ExpressionInput {
  expressionInput: HTMLInputElement;
  constructor(inputContainer: HTMLDivElement) {
    // Create the expression input field
    const expressionInputContainer = document.createElement("div");
    expressionInputContainer.classList.add("input-group", "input-group-sm", "mb-3", "w-25");
    expressionInputContainer.innerHTML = `
  <div class="input-group-prepend">
    <span class="input-group-text" id="expressionInput">Expression</span>
  </div>
  
  `;
    this.expressionInput = document.createElement("input");
    this.expressionInput.classList.add("form-control");
    this.expressionInput.id = "expressionInput";
    this.expressionInput.type = "text";
    this.expressionInput.autofocus = true;
    expressionInputContainer.appendChild(this.expressionInput);
    inputContainer.appendChild(expressionInputContainer);
  }
}

export class ResultInput {
  resultInput: HTMLInputElement;
  constructor(inputContainer: HTMLDivElement) {
    const resultContainer = document.createElement("div");
    resultContainer.classList.add("input-group", "input-group-sm", "mb-3", "d-flex", "justify-content-center");
    resultContainer.innerHTML = `
    <div class="input-group-prepend">
      <span class="input-group-text" id="resultInput">Result</span>
    </div>`;
    this.resultInput = document.createElement("input");
    this.resultInput.id = "resultInput";
    this.resultInput.classList.add('form-control"');
    this.resultInput.type = "text";
    this.resultInput.disabled = true;
    resultContainer.appendChild(this.resultInput);
    inputContainer.appendChild(resultContainer);
  }
}

export class ButtonContainer {
  buttons: HTMLButtonElement[];
  buttonContainer: HTMLDivElement;
  constructor() {
    this.buttons = [];
    this.buttonContainer = document.createElement("div");
    this.buttonContainer.classList.add("buttons", "container", "text-center", "w-25");

    const buttonValues = [
      ["7", "8", "9", "+"],
      ["4", "5", "6", "-"],
      ["1", "2", "3", "*"],
      ["C", "0", "=", "/"],
    ];

    buttonValues.forEach((row) => {
      const buttonRow = document.createElement("div");
      buttonRow.classList.add("button-row", "row");

      row.forEach((buttonValue) => {
        const button = document.createElement("button");
        button.classList.add("col", "m-1", "btn", "btn-outline-primary");
        if (buttonValue === "0") button.classList.add("w-200");
        button.innerText = buttonValue;
        buttonRow.appendChild(button);
        this.buttons.push(button);
      });

      this.buttonContainer.appendChild(buttonRow);
    });
  }
}
