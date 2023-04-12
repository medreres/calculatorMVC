import { CalculatorController } from "./controller";
import { CalculatorModel } from "./model";
import { CalculatorView } from "./view";

const model = new CalculatorModel();
const view = new CalculatorView();
const controller = new CalculatorController(model, view);
controller.render();
