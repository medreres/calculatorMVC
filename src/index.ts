import CalculatorController from "./controller/CalculatorController/CalculatorController";
import CalculatorModel from "./model/CalculatorModel/CalculatorModel";
import CalculatorView from "./view/CalculatorView";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import { Operation } from "./lib/Calculator";

const model = new CalculatorModel();
const view = new CalculatorView();
const controller = new CalculatorController(model, view);

// add new operation
const factorial = new Operation("!", 3, (a: number) => {
  let acc = 1;
  for (let i = 1; i <= a; i++) {
    acc *= i;
  }
  return acc;
});

controller.addOperation(factorial);

document.body.appendChild(controller.getView());
