import { Operation } from "../../../lib/Calculator";
import { Notation } from "../../../lib/Calculator/Operation/interfaces";
import Observer from "../../../lib/Observer";
import { Events } from "../../../shared/events";
import { initializeController } from "./utils";

const observer = new Observer().getInstance();

describe("Calculator Controller", () => {
  test("Initializes", () => {
    expect(initializeController).not.toThrow(Error);
  });

  test("Listens for input change", () => {
    let modelInputChanged = false;

    observer.on(Events.MODEL_CHANGE_INPUT, () => (modelInputChanged = true));

    observer.notify(Events.VIEW_INPUT_CHANGED);

    expect(modelInputChanged).toBe(true);
  });

  test("Listens for input change and provide value", () => {
    const inputValue = "test";
    let isEquals = false;

    observer.on(Events.MODEL_CHANGE_INPUT, (value: string) => (isEquals = value === inputValue));

    observer.notify(Events.VIEW_INPUT_CHANGED, inputValue);

    expect(isEquals).toBe(true);
  });

  test("Listens for calculate event", () => {
    let isCalculated = false;

    observer.on(Events.VIEW_CALCULATE, () => (isCalculated = true));

    observer.notify(Events.VIEW_CALCULATE);

    expect(isCalculated).toBe(true);
  });

  test("Listens for calculate event and order model to calculate", () => {
    let modelCalculates = false;

    observer.on(Events.MODEL_CALCULATE, () => (modelCalculates = true));

    observer.notify(Events.VIEW_CALCULATE);

    expect(modelCalculates).toBe(true);
  });

  test("Tells model to clear input", () => {
    let modelClearsInput = false;

    observer.on(Events.MODEL_CLEAR_INPUT, () => (modelClearsInput = true));

    observer.notify(Events.VIEW_INPUT_CLEARED);

    expect(modelClearsInput).toBe(true);
  });

  test("Tells view to set result", () => {
    let viewSetsResult = false;

    observer.on(Events.VIEW_SET_RESULT, () => (viewSetsResult = true));

    observer.notify(Events.MODEL_CALCULATED);

    expect(viewSetsResult).toBe(true);
  });

  test("Tells view to set result and provides correct value", () => {
    let isResultCorrect = false;
    const result = 5;

    observer.on(Events.VIEW_SET_RESULT, (value: number) => (isResultCorrect = value === result));

    observer.notify(Events.MODEL_CALCULATED, result);

    expect(isResultCorrect).toBe(true);
  });

  test("Adds new operation successfully", () => {
    let isOperationAdded = false;
    const operation = new Operation("exp", 3, Notation.PREFIX, (value: number) => Math.exp(value));

    observer.on(Events.ADD_NEW_OPERATION, () => (isOperationAdded = true));

    observer.notify(Events.ADD_NEW_OPERATION, operation);

    expect(isOperationAdded).toBe(true);
  });
});
