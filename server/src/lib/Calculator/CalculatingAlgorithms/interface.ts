import { Operation } from "../internal";


/**
 * @description Abstract base class providing main functionality for
 * calculating algorithm
 */
export default interface ICalculatingAlgorithm {
  evaluate: (expression: string) => number;

  addOperation: (operation: Operation) => void;
  getOperations(): Operation[];

  addConstant: (key: string, value: number) => void;

  isExpressionValid: (expression: string) => boolean;
}
