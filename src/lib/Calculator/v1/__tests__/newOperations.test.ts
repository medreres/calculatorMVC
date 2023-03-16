import { Notation } from "../../Operation/interfaces";
import Operation from "../../Operation/Operation";
import { evaluator } from "./utils";

describe("New operations", () => {
  // TODO constants
  // test("Adds new operation", () => {
  //   const operation = new Operation("e", 3, () => Math.E);

  //   const addOperation = () => evaluator.addNewOperation(operation);

  //   expect(addOperation).not.toThrow(Error);
  // });

  // TODO constants
  // test("Adds new operation and performs it", () => {
  //   // Arrange
  //   const expression = "e * 3";
  //   const answer = Math.E * 3;

  //   // Act
  //   const result = evaluator.evaluate(expression);

  //   // Assert
  //   expect(result).toEqual(answer);
  // });

  test("Adds new operation and performs it 2", () => {
    // Arrange
    // TODO fix
    const operation = new Operation("max", 2, Notation.PREFIX, (a: number, b: number) => Math.max(a, b));
    const expression = "max(max(-100,10), max(20,20))";
    const answer = 20;

    // Act
    evaluator.addNewOperation(operation);
    const result = evaluator.evaluate(expression);

    // Assert
    expect(result).toEqual(answer);
  });

  // TODO fix
  test("Adds new operation and performs it 3", () => {
    // Arrange
    const operation = new Operation("sqrt", 2, Notation.PREFIX, (a: number) => Math.sqrt(a));
    const expression = "sqrt(max(max(-100,10), max(20,25)))";
    const answer = 5;

    // Act
    evaluator.addNewOperation(operation);
    const result = evaluator.evaluate(expression);

    // Assert
    expect(result).toEqual(answer);
  });
});
