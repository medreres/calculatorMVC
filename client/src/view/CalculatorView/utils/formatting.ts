import { MainOperations } from "../../../shared/operations";

export const formatSymbols = (operations: string[]) => {
  const operationSymbols = operations as string[];

  const presentOperationSymbols: string[] = Object.values(MainOperations);

  return operationSymbols.filter((symbol) => !presentOperationSymbols.includes(symbol));
};
