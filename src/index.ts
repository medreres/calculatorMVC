import CalculatorController from "./controller/CalculatorController";
import CalculatorModel from "./model/CalculatorModel/CalculatorModel";
import CalculatorView from "./view/CalculatorView";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";

const model = new CalculatorModel();
const view = new CalculatorView();
const controller = new CalculatorController(model, view);
document.body.appendChild(view.container);
