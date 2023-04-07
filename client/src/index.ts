import CalculatorController from "./controller/CalculatorController";
import CalculatorModel from "./model/CalculatorModel";
import CalculatorView from "./view/CalculatorView";


// TODO 1000000! -> null
// TODo validate for operation presence on expressions input
const model = new CalculatorModel();
const view = new CalculatorView();
const controller = new CalculatorController(model, view);

document.body.appendChild(controller.getView());
