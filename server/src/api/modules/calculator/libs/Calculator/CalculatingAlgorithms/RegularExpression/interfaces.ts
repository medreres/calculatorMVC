import Operation from "../../utils/Operation";

export interface IPerformOperation {
  expression: string;
  operation: Operation;
  operationIndexInString: number;
}

export interface IFormattedOperation {
  operation: Operation;
  index: number;
}
