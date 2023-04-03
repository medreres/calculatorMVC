import { Constant } from "../interfaces";
import Operation from "../utils/Operation";

/**
 * @description Abstract base class providing main functionality for
 * calculating algorithm
 */
export default interface ICalculatingAlgorithm {
  evaluate: (expression: string) => number;

  addOperation: (operation: Operation) => void;
  getOperations(): Operation[];

  addConstant: (key: string, value: number) => void;
  getConstants(): Constant[];

  isExpressionValid: (expression: string) => boolean;
}
