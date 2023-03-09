import CalculatorController from "./controller/CalculatorController";
import CalculatorModel from "./model/CalculatorModel/CalculatorModel";
import CalculatorView from "./view/CalculatorView";
import { Operation } from "./lib/Calculator";
import "bootstrap/dist/css/bootstrap.css";

const model = new CalculatorModel();
const view = new CalculatorView();
const controller = new CalculatorController(model, view);
controller.addNewOperation(new Operation("tan", 3, (value: number) => Math.tan(value)));
controller.addNewOperation(new Operation("cos", 3, (value: number) => Math.cos(value)));
document.body.appendChild(view.container);
