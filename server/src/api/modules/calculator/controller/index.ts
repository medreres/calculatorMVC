import Calculator from "../libs/Calculator";
import { Request, Response } from "express";
import Expression from "../model";
import { Errors, HISTORY_SIZE } from "../../../config";

const calculator = new Calculator();

// TODO sqrt doesn't work
export const evaluate = (req: Request, res: Response) => {
  let expression = req.query.expression as string;

  if (!expression) {
    return res.status(400).json({ error: Errors.MISSING_EXPRESSION });
  }
  // trim all whitespace
  expression = expression.replaceAll(" ", "");

  let result: number | undefined;

  if (!calculator.isExpressionValid(expression)) {
    return res.status(400).json({ error: Errors.INVALID_EXPRESSION });
  }

  try {
    result = calculator.evaluate(expression);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: Errors.INVALID_EXPRESSION });
  }

  try {
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
        timestamp: new Date(),
      });

      document.save();
    });
  } catch (error) {
    console.log(error);
  }

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

// LIMIT as default search params
export const getLastOperations = (_req: Request, res: Response) => {
  try {
    Expression.findMany({} as any).then((result) => res.status(200).json({ data: result }));
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ error: Errors.NO_CONNECTION });
  }
};
