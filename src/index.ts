import CalculatorController from "./controller/CalculatorController/CalculatorController";
import CalculatorModel from "./model/CalculatorModel/CalculatorModel";
import CalculatorView from "./view/CalculatorView";
import { Operation } from "./lib/Calculator";
import { Notation } from "./lib/Calculator/Operation/interfaces";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const model = new CalculatorModel();
const view = new CalculatorView();
const controller = new CalculatorController(model, view);

const inverse = new Operation("INV", 3, Notation.PREFIX, (a: number) => 1 / a);
controller.addOperation(inverse);

document.body.appendChild(controller.getView());
