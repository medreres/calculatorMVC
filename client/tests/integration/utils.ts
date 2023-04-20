import { CalculatorController } from "@/controller";
import { CalculatorModel } from "@/model";
import { GeneralEvents, ViewEvents } from "@/shared";
import { CalculatorView } from "@/view";
import * as requests from "@/controller/CalculatorController/utils/requests";

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
export const controller = new CalculatorController(model, view);
controller.render();

export const initializeApp = () => {
  afterEach(() => {
    controller.notify(ViewEvents.SET_INPUT, "");
  });
};

export const connectionFailed = () => {
  controller.notify(GeneralEvents.CONNECTION_FAILED);
};
