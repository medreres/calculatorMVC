import Observer from "../../../lib/Observer";
import { Events } from "../../../shared/events";
import CalculatorModel from "../CalculatorModel";

describe("Calculator Model", () => {
  test("Evaluates expression", () => {
    const calcModel = new CalculatorModel();
    const expression = "1 + 2 * 3 - 10 + ( 1 * 2 / ( 5 - 4 ))";
    const answer = -1;
    calcModel.setExpression(expression);
    expect(calcModel.calculate()).toBe(answer);
  });

  test("Listens to Events", () => {
    const calcModel = new CalculatorModel();
    const observer = new Observer().getInstance();

    const expression = "1 + 2 * 3 - 10 + ( 1 * 2 / ( 5 - 4 ))";
    const answer = -1;

    observer.notify(Events.MODEL_CHANGE_INPUT, expression);
    observer.notify(Events.MODEL_CALCULATE);

    expect(calcModel.getResult()).toBe(answer);
  });
});
