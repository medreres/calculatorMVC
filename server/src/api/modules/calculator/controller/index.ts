import Calculator, { errorsDescription } from "../../../../lib/Calculator";
import { Request, Response } from "express";
import MongoDB, { Types } from "../MongoDB/Mongo";
import Expression from "../model";
// import Expression from "../../util/MongoDB/models/Expression";

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

  Expression.findOne({ expression }).then((r) => {
    // if there exist expression, do not add another one
    if (r) return;

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
