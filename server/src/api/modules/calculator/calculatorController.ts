import Calculator, { errorsDescription } from "../../../lib/Calculator";
import { Request, Response } from "express";

const calculator = new Calculator();

export const evaluate = (req: Request, res: Response) => {
  const expr = req.query.expression as string;

  if (!expr) {
    return res.status(400).json({ error: errorsDescription.MISSING_EXPRESSION });
  }

  let result: number | undefined;

  if (!calculator.isExpressionValid(expr)) {
    return res.status(400).json({ error: errorsDescription.INVALID_EXPRESSION });
  }

  try {
    result = calculator.evaluate(expr);
  } catch (error) {
    return res.status(400).json({ error: errorsDescription.INVALID_EXPRESSION });
  }

  res.status(200).json({ data: result });
};

export const getOperations = (req: Request, res: Response) => {
  const operations = calculator.getOperations();
  const operationsSymbols = operations.map((operation) => operation.symbol);

  res.status(200).json({ data: operationsSymbols });
};

// ? should we sent value of constants or just their names to provide
// ?uniform interface between getOperations and getConstants
export const getConstants = (req: Request, res: Response) => {
  const constants = calculator.getConstants();

  res.json({ data: constants });
};
