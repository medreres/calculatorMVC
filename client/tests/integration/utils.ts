import { CalculatorController } from "@/controller";
import { CalculatorModel } from "@/model";
import { ViewEvents } from "@/shared";
import { CalculatorView } from "@/view";
import * as requests from "../../src/controller/CalculatorController/utils/requests";

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
    controller.notify(ViewEvents.SET_INPUT, "");
  });
};

export const setExpression = (value: string) => {
  return Promise.resolve(() => {
    view.setExpression(value);
    controller.notify(ViewEvents.INPUT_CHANGED, value);
  });
};
