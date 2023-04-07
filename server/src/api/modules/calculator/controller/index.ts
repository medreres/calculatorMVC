import Calculator from "../../../../libs/Calculator";
import { Request, Response } from "express";
import Expression from "../model";
import { Errors, HISTORY_SIZE } from "../../../../config";

const calculator = new Calculator();

// TODo 1000000000000!
// TODO handle infinity in algorithms
// TODO event loop could possibly be blocked
// TODO update of expressions is handled at db level
export const evaluate = (req: Request, res: Response) => {
  let expression = req.body.expression as string;

  if (!expression) {
    return res.status(400).json({ error: Errors.MISSING_EXPRESSION });
  }
  // trim all whitespace
  expression = expression.replaceAll(" ", "");

  // find this expression in db, if exists - return result
  //TODO if infinity result is send as null
  Expression.findOne({ expression }).then((history) => {
    if (history) {
      Expression.updateOne(
        {
          _id: history._id,
        },
        {
          $set: {
            updatedAt: new Date(),
          },
        }
      );
      return res.status(200).json({ data: history.result.toString() });
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
      result,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    document.save();

    // TODO serialize method for Models

    return res.status(200).json({ data: result.toString() });
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
export const getLastExpressions = (_req: Request, res: Response) => {
  // TODO exposed toArray method from mongoDB
  try {
    Expression.findMany()
      .sort({
        updatedAt: -1,
      })
      .limit(HISTORY_SIZE)
      .toArray()
      .then((result) => {
        const dataSerialized = result.map((result) => ({
          ...result,
          result: result.result.toString(),
        }));

        return res.status(200).json({ data: dataSerialized });
      });
  } catch (error) {
    console.error(error);
    res.sendStatus(500).json({ error: Errors.NO_CONNECTION });
  }
};
