import CalculatorController from "./controller/CalculatorController";
import CalculatorModel from "./model/CalculatorModel";
import CalculatorView from "./view/CalculatorView";


const model = new CalculatorModel();
const view = new CalculatorView();
const controller = new CalculatorController(model, view);

// controller.addNewConstant('G', 9.81)

document.body.appendChild(controller.getView());
