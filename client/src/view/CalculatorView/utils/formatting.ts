import { AdditionalOperations, MainOperations } from "../config";

export const formatAvailableOperations = (operations: string[]) => {
  const { LEFT_PARENTHESES, RIGHT_PARENTHESES } = AdditionalOperations;
  const operationSymbols = operations as string[];
  if (!operationSymbols.includes(LEFT_PARENTHESES)) {
    operationSymbols.push(LEFT_PARENTHESES);
  }

  if (!operationSymbols.includes(RIGHT_PARENTHESES)) {
    operationSymbols.push(RIGHT_PARENTHESES);
  }

  const presentOperationSymbols: string[] = Object.values(MainOperations);

  return operationSymbols.filter((symbol) => !presentOperationSymbols.includes(symbol));
};
