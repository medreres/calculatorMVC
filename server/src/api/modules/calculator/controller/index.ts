import Calculator, { errorsDescription } from "../libs/Calculator";
import { Request, Response } from "express";
import Expression from "../model";
import { HISTORY_SIZE } from "../../../config";

const calculator = new Calculator();

export const evaluate = (req: Request, res: Response) => {
  const expression = req.query.expression as string;

  if (!expression) {
    return res.status(400).json({ error: errorsDescription.MISSING_EXPRESSION });
  }

  let result: number | undefined;

  if (!calculator.isExpressionValid(expression)) {
    return res.status(400).json({ error: errorsDescription.INVALID_EXPRESSION });
  }

  try {
    result = calculator.evaluate(expression);
  } catch (error) {
    return res.status(400).json({ error: errorsDescription.INVALID_EXPRESSION });
  }

  // TODO spaces between expressions
  // TODO remove oldest expression if more than 5

  Expression.findMany({}).then((r) => {
    if (r.find((expr) => expr.expression === expression)) {
      return;
    }

    // if there exist expression, do not add another one
    if (r.length >= HISTORY_SIZE) {
      Expression.deleteOne({ expression: r[0]!.expression });
    }

    const document = new Expression({
      expression,
      result: result as number,
    });

    document.save();
  });

  return res.status(200).json({ data: result });
};

export const getOperations = (_req: Request, res: Response) => {
  const operations = calculator.getOperations();
  const operationsSymbols = operations.map((operation) => operation.symbol);

  res.status(200).json({ data: operationsSymbols });
};

export const getConstants = (_req: Request, res: Response) => {
  const constants = calculator.getConstants();

  res.json({ data: constants });
};
