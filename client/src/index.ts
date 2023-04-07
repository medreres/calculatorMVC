import CalculatorController from "./controller/CalculatorController";
import CalculatorModel from "./model/CalculatorModel";
import CalculatorView from "./view/CalculatorView";

// TODo validate for operation presence on expressions input before requesting
const model = new CalculatorModel();
const view = new CalculatorView();
const controller = new CalculatorController(model, view);

document.body.appendChild(controller.getView());
