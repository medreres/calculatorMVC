export function ExpressionInput(): HTMLInputElement {
  const expressionInput = document.createElement("input");
  expressionInput.classList.add("calculator-screen", "z-depth-1");
  return expressionInput;
}

export function ResultInput(): HTMLInputElement {
  const resultInput = document.createElement("input");
  resultInput.classList.add("result-screen", "z-depth-1", "fs-3");
  resultInput.disabled = true;
  return resultInput;
}

export function ButtonContainer(): {
  buttons: HTMLButtonElement[];
  buttonContainer: HTMLDivElement;
} {
  const buttons: HTMLButtonElement[] = [];
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("calculator-keys");

  const buttonValues = [
    ["+", "-", "*", "/"],
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    ["0", ".", "AC", "="],
  ];

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("calculator-keys");
  buttonValues.forEach((row) =>
    row.forEach((value) => {
      const button = document.createElement("button");
      if (!isNaN(+value)) button.classList.add("btn", "btn-light", "waves-effect");
      else if (value === ".") button.classList.add("decimal", "function", "btn", "btn-secondary");
      else if (value === "AC") button.classList.add("all-clear", "function", "btn", "btn-danger", "btn-sm");
      else if (value === "=") button.classList.add("equal-sign", "operator", "btn", "btn-light");
      else button.classList.add("operator", "btn", "btn-info");

      button.innerHTML = value;
      buttons.push(button);
      buttonContainer.appendChild(button);
    })
  );

  return { buttons, buttonContainer };
}
