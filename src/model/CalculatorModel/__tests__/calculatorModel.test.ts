import Observer from "../../../lib/Observer";
import { events } from "../../../shared/config";
import CalculatorModel from "../CalculatorModel";

describe("Calculator Model", () => {
  test("Evaluates expression", () => {
    const calcModel = new CalculatorModel();
    const expression = "1 + 2 * 3 - 10 + ( 1 * 2 / ( 5 - 4 ))";
    const answer = -1;
    calcModel.setExpression(expression);
    expect(calcModel.calculate()).toBe(answer);
  });

  test("Listens to events", () => {
    const calcModel = new CalculatorModel();
    const observer = new Observer().getInstance();

    const expression = "1 + 2 * 3 - 10 + ( 1 * 2 / ( 5 - 4 ))";
    const answer = -1;

    observer.notify(events.MODEL_CHANGE_INPUT, expression);
    observer.notify(events.MODEL_CALCULATE);

    expect(calcModel.getResult()).toBe(answer);
  });
});
