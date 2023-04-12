import * as requests from "../../src/controller/CalculatorController/utils/requests";
import CalculatorController from "../../src/controller/CalculatorController";
import CalculatorModel from "../../src/model/CalculatorModel";
import CalculatorView from "../../src/view/CalculatorView";
import { Events } from "../../src/shared";

export const mockGetHistory = jest.spyOn(requests, "fetchHistory").mockImplementation(() => {
  return Promise.resolve([
    {
      expression: "1+2",
      result: "3",
    },
  ]);
});

export const mockGetOperations = jest.spyOn(requests, "fetchOperationsSymbols").mockImplementation(() => {
  return Promise.resolve(["sin"]);
});

export const mockFetchResult = jest.spyOn(requests, "fetchResult").mockImplementation(() => {
  console.log("mocking");
  return Promise.resolve({
    data: 10,
    error: undefined,
  });
});

const model = new CalculatorModel();
const view = new CalculatorView();
const controller = new CalculatorController(model, view);

export const initializeApp = () => {
  beforeEach(() => {
    // reset body
    controller.render();
  });

  afterEach(() => {
    controller.notify(Events.VIEW_SET_INPUT, "");
  });
};

export const setExpression = (value: string) => {
  return Promise.resolve(() => {
    view.setExpression(value);
    controller.notify(Events.VIEW_INPUT_CHANGED, value);
  });
};
