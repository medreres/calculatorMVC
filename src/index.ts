import CalculatorController from "./controller/CalculatorController";
import CalculatorModel from "./model/CalculatorModel";
import CalculatorView from "./view/CalculatorView";
import { Operation } from "./lib/Calculator";
import { Notation } from "./lib/Operation/interfaces";

const model = new CalculatorModel();
const view = new CalculatorView();
const controller = new CalculatorController(model, view);

const inverse = new Operation("INV", 3, Notation.PREFIX, (a: number) => 1 / a);
controller.addOperation(inverse);

document.body.appendChild(controller.getView());
