import Observer from "../../../lib/Observer";
import CalculatorModel from "../CalculatorModel";

describe("Calculator Model", () => {
  test("Evaluates expression", () => {
    const calcModel = new CalculatorModel();
    const expression = "1 + 2 * 3 - 10 + ( 1 * 2 / (5 -4 ))";
    const answer = -1;
    calcModel.setExpression(expression);
    expect(calcModel.calculate()).toBe(answer);
  });

  test("Listens to events", () => {
    const calcModel = new CalculatorModel();
    const observer = new Observer();
    calcModel.setObservers(observer);

    const expression = "1 + 2 * 3 - 10 + ( 1 * 2 / (5 -4 ))";
    const answer = -1;

    observer.notify("expressionInputChange", expression);
    observer.notify("calculate");

    expect(calcModel.getResult()).toBe(answer);
  });
});
