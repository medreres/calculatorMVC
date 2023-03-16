import CalculatorController from "./controller/CalculatorController/CalculatorController";
import CalculatorModel from "./model/CalculatorModel/CalculatorModel";
import CalculatorView from "./view/CalculatorView";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import { Operation } from "./lib/Calculator";
import { Notation } from "./lib/Calculator/Operation/interfaces";

const model = new CalculatorModel();
const view = new CalculatorView();
const controller = new CalculatorController(model, view);

// const factorial = new Operation("!", 3, Notation.POSTFIX, (a: number) => {
//   let acc = 1;
//   for (let i = 1; i <= a; i++) {
//     acc *= i;
//   }
//   return acc;
// });

// controller.addOperation(factorial);
// // add new operation
// const tan = new Operation("tan", 3, Notation.PREFIX, (a: number) => {
//   return Math.tan(a);
// });
// controller.addOperation(tan);

document.body.appendChild(controller.getView());
