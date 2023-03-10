import { Operation } from "../../lib/Calculator";
import Observer from "../../lib/Observer";
import { events } from "../../shared/events.config";
import CalculatorController from "../CalculatorController";

const observer = new Observer().getInstance();

describe("Calculator Controller", () => {
  test("Initializes", () => {
    expect(initializeController).not.toThrow(Error);
  });

  test("Listens for input change", () => {
    let modelInputChanged = false;

    observer.on(events.MODEL_CHANGE_INPUT, () => (modelInputChanged = true));

    observer.notify(events.VIEW_INPUT_CHANGED);

    expect(modelInputChanged).toBe(true);
  });

  test("Listens for input change and provide value", () => {
    const inputValue = "test";
    let isEquals = false;

    observer.on(events.MODEL_CHANGE_INPUT, (value: string) => (isEquals = value === inputValue));

    observer.notify(events.VIEW_INPUT_CHANGED, inputValue);

    expect(isEquals).toBe(true);
  });

  test("Listens for calculate event", () => {
    let isCalculated = false;

    observer.on(events.VIEW_CALCULATE, () => (isCalculated = true));

    observer.notify(events.VIEW_CALCULATE);

    expect(isCalculated).toBe(true);
  });

  test("Listens for calculate event and order model to calculate", () => {
    let modelCalculates = false;

    observer.on(events.MODEL_CALCULATE, () => (modelCalculates = true));

    observer.notify(events.VIEW_CALCULATE);

    expect(modelCalculates).toBe(true);
  });

  test("Tells model to clear input", () => {
    let modelClearsInput = false;

    observer.on(events.MODEL_CLEAR_INPUT, () => (modelClearsInput = true));

    observer.notify(events.VIEW_INPUT_CLEARED);

    expect(modelClearsInput).toBe(true);
  });

  test("Tells view to set result", () => {
    let viewSetsResult = false;

    observer.on(events.VIEW_SET_RESULT, () => (viewSetsResult = true));

    observer.notify(events.MODEL_CALCULATED);

    expect(viewSetsResult).toBe(true);
  });

  test("Tells view to set result and provides correct value", () => {
    let isResultCorrect = false;
    const result = 5;

    observer.on(events.VIEW_SET_RESULT, (value: number) => (isResultCorrect = value === result));

    observer.notify(events.MODEL_CALCULATED, result);

    expect(isResultCorrect).toBe(true);
  });

  test("Adds new operation successfully", () => {
    let isOperationAdded = false;
    const operation = new Operation("exp", 3, (value: number) => Math.exp(value));

    observer.on(events.MODEL_ADD_NEW_OPERATION, () => (isOperationAdded = true));

    observer.notify(events.VIEW_ADD_NEW_OPERATION, operation);

    expect(isOperationAdded).toBe(true);
  });

  test("Does not add invalid operation", () => {
    let isOperationAdded;
    const operation = new Operation("exp", 3, () => "a");

    observer.on(events.VIEW_ADDING_INVALID_OPERATION, () => (isOperationAdded = false));

    observer.notify(events.VIEW_ADD_NEW_OPERATION, operation);

    expect(isOperationAdded).toBe(false);
  });
});

const initializeController = () => {
  const mockView = {} as any;
  const mockModel = {} as any;
  const controller = new CalculatorController(mockModel, mockView);

  return controller;
};
