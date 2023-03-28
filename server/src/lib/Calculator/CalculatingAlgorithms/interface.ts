import Operation from "../utils/Operation";

/**
 * @description Abstract base class providing main functionality for
 * calculating algorithm
 */
export default interface ICalculatingAlgorithm {
  evaluate: (expression: string) => number;

  addOperation: (operation: Operation) => void;

  addConstant: (key: string, value: number) => void;

  isExpressionValid: (expression: string) => boolean;
}
