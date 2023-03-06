class CalculatorController {
  model: any;
  view: any;
  constructor(model: any, view: any) {
    this.model = model;
    this.view = view;
    this.view.setModel(this.model);
    this.view.render();

    // Attach event listeners to buttons
    // TODO could be to view class
    this.view.buttons.forEach((button: HTMLButtonElement) => {
      button.addEventListener("click", () => {
        this.handleButtonClick(button.innerText);
      });
    });

    this.view.expressionInput.addEventListener("keypress", (event: any) => {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
        this.handleButtonClick(event.key);
      }
    });
  }

  handleButtonClick(value: any) {
    switch (value) {
      case "C":
        this.model.setExpression("");
        this.model.setResult("");
        break;
      case "=":
      case "Enter":
        this.model.calculate();
        break;
      default:
        const isNumber = !isNaN(value);
        console.log(isNumber)
        this.model.setExpression(`${this.model.expression}${isNumber ? '' : ' '}${value}${isNumber ? '' : ' '}`);
        break;
    }

    this.view.render();
  }
}

export default CalculatorController;
