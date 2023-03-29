import "../../lib/Calculator"; // side effect import for circular imports resolve
import { calculatorConfig } from "../../config";
import Calculator from "../../lib/Calculator";
import { Request, Response } from "express";

const calculator = new Calculator();

const evaluate = (req: Request, res: Response) => {
  const expr = req.query.expression as string;

  if (!expr) {
    return res.status(400).json({ error: calculatorConfig.errorsDescription.MISSING_EXPRESSION });
  }

  let result: number | undefined;

  if (!calculator.isExpressionValid(expr)) {
    return res.status(400).json({ error: calculatorConfig.errorsDescription.INVALID_EXPRESSION });
  }

  try {
    result = calculator.evaluate(expr);
  } catch (error) {
    return res.status(400).json({ error: calculatorConfig.errorsDescription.INVALID_EXPRESSION });
  }

  res.status(200).json({ result });
};

const getOperations = (req: Request, res: Response) => {
  const operations = calculator.getOperations();
  const operationsSymbols = operations.map((operation) => operation.symbol);

  res.status(200).json({ operations: operationsSymbols });
};

const getConstants = (req: Request, res: Response) => {
  const constants = calculator.getConstants();

  res.json({ constants: constants });
};

export default {
  evaluate,
  getOperations,
  getConstants,
};
