import CalculatorController from "..";

export const initializeController = () => {
  const mockView = {} as any;
  const mockModel = {} as any;
  const controller = new CalculatorController(mockModel, mockView);

  return controller;
};
