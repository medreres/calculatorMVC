import Calculator from "../../../../libs/Calculator";
import { Request, Response } from "express";
import Expression from "../model";
import { Errors } from "../../../../config";

const calculator = new Calculator();

export const evaluate = (req: Request, res: Response) => {
  let expression = req.body.expression as string;

  if (!expression) {
    return res.status(400).json({ error: Errors.MISSING_EXPRESSION });
  }
  // trim all whitespace
  expression = expression.replaceAll(" ", "");

  // find this expression in db, if exists - return result
  Expression.findOne({ expression }).then((history) => {
    if (history) {
      return res.status(200).json({ data: history.result });
    }

    let result: number;

    if (!calculator.isExpressionValid(expression)) {
      return res.status(400).json({ error: Errors.INVALID_EXPRESSION });
    }

    try {
      result = calculator.evaluate(expression);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: Errors.INVALID_EXPRESSION });
    }

    const document = new Expression({
      expression,
      result: result,
      timestamp: new Date(),
    });

    document.save();

    return res.status(200).json({ data: result });
  });
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

//TODO LIMIT as default search params
//TODO rename endpoint expressions with params like limit offset
export const getLastOperations = (_req: Request, res: Response) => {
  try {
    Expression.findMany().then((result) => res.status(200).json({ data: result }));
  } catch (error) {
    console.error(error);
    res.sendStatus(500).json({ error: Errors.NO_CONNECTION });
  }
};
