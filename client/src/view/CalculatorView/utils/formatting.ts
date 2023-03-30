import { MainOperations } from "../config";

export const formatAvailableOperations = (operations: string[]) => {
  const operationSymbols = operations as string[];

  const presentOperationSymbols: string[] = Object.values(MainOperations);

  return operationSymbols.filter((symbol) => !presentOperationSymbols.includes(symbol));
};
