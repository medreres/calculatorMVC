import CalculatorController from "./controller/CalculatorController";
import CalculatorModel from "./model/CalculatorModel/CalculatorModel";
import CalculatorView from "./view/CalculatorView";
import { Operation } from "./lib/Calculator";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";

const model = new CalculatorModel();
const view = new CalculatorView();
const controller = new CalculatorController(model, view);

// const expression = "max( max (10,3),  15)";
// const operation = new Operation("max", 3, (a: number, b: number) => Math.max(a, b));
// const calc = new Calculator();
// calc.addNewOperation(operation);
// calc.evaluate(expression);


// add new operations
// controller.addNewOperation(new Operation("tan", 3, (value: number) => Math.tan(value)));
// controller.addNewOperation(new Operation("cos", 3, (value: number) => Math.cos(value)));

document.body.appendChild(view.container);
