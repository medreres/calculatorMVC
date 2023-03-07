import Observer from "../lib/Observer";
import CalculatorModelBaseClass from "../model/interface";
import CalculatorViewBaseClass from "../view/interface";

export default abstract class CalculatorControllerBaseClass {
  model: CalculatorModelBaseClass;
  view: CalculatorViewBaseClass;
  observer: Observer;
  constructor(model: CalculatorModelBaseClass, view: CalculatorViewBaseClass) {
    this.observer = new Observer();
    this.model = model;
    this.model.setObservers(this.observer);
    this.view = view;
    this.view.setObservers(this.observer);
    // this.view.setModel(this.model);
    // this.view.render();

    // Attach event listeners to buttons

    // this.view.buttons.forEach((button: HTMLButtonElement) => {
    //   button.addEventListener("click", (e: any) => {
    //     // this.handleButtonClick(button.innerText);
    //     if (e.target.innerText === "=") return this.observer.notify("calculate");

    //     this.observer.notify("btnClick", button.innerHTML);
    //   });
    // });

    // this.view.expressionInput.addEventListener("input", (e: any) => {
    //   // this.model.setExpression(this.view.expressionInput.value);
    //   this.observer.notify("manualInput", e.target.value);
    //   // this.model.calculate();
    //   // this.view.resultInput.value = this.model.result;
    // });

    // this.view.expressionInput.addEventListener("keypress", (event: any) => {
    //   // If the user presses the "Enter" key on the keyboard
    //   if (event.key === "Enter") {
    //     this.observer.notify("calculate");
    //   }
    // });

    // this.observer.on("btnClick", (data: any) => {
    //   // console.log(data);
    //   const isNumber = !isNaN(data);
    //   const expression = `${this.model.expression}${isNumber ? "" : " "}${data}${isNumber ? "" : " "}`;
    //   this.model.setExpression(expression);
    //   this.view.setExpression(expression);
    // });

    // this.observer.on("calculate", () => {
    //   this.model.calculate();
    //   this.view.resultInput.value = this.model.result;
    // });

    // this.observer.on("manualInput", (data: string) => {
    //   this.model.expression = data;
    //   this.view.expressionInput.value = data;
    // });
  }
}
