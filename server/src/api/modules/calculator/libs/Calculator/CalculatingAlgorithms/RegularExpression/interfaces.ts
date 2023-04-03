import Operation from "../../utils/Operation";

export interface IPerformOperation {
  expression: string;
  operation: Operation;
  operationIndexInString: number;
}

export interface formattedOperation {
  operation: Operation;
  index: number;
}
