import CalculatorController from "./controller/CalculatorController";
import Operation from "./lib/Calculator/utils/Operation";
import { Notation } from "./lib/Calculator/utils/Operation/interfaces";
import CalculatorModel from "./model/CalculatorModel";
import CalculatorView from "./view/CalculatorView";

const model = new CalculatorModel();
const view = new CalculatorView();
const controller = new CalculatorController(model, view);

controller.addOperation(new Operation("tan", 4, Notation.PREFIX, (a: number) => Math.tan(a)));
controller.addOperation(new Operation("sin", 4, Notation.PREFIX, (a: number) => Math.sin(a)));

document.body.appendChild(controller.getView());
