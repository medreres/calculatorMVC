import CalculatorControllerBaseClass from "./interface";
class CalculatorController extends CalculatorControllerBaseClass {
  // handleButtonClick(value: any) {
  //   switch (value) {
  //     case "C":
  //       this.model.setExpression("");
  //       this.model.setResult("");
  //       break;
  //     case "=":
  //     case "Enter":
  //       this.model.calculate();
  //       this.view.resultInput.value = this.model.result;
  //       break;
  //     default:
  //       const isNumber = !isNaN(value);
  //       this.model.setExpression(`${this.model.expression}${isNumber ? "" : " "}${value}${isNumber ? "" : " "}`);
  //       this.view.expressionInput.value = this.model.expression;
  //       break;
  //   }
  // this.view.render();
  // }
}

export default CalculatorController;
