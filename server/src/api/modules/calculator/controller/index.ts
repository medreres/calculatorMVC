import Calculator from "../../../../libs/Calculator";
import { Request, Response } from "express";
import Expression from "../model";
import { Errors, HISTORY_SIZE } from "../../../../config";
import { QUERY_LIMIT } from "../../../../libs/MongoDB";
import logger from "../../../../logger";

const calculator = new Calculator();

export const evaluate = (req: Request, res: Response) => {
  let expression = req.body.expression as string;
  logger.info("Expression: " + expression);

  if (!expression) {
    logger.error("Missing expression");
    return res.status(400).json({ error: Errors.MISSING_EXPRESSION });
  }
  // trim all whitespace
  expression = expression.replaceAll(" ", "");

  // find this expression in db, if exists - return result
  Expression.findOne({ expression }).then((history) => {
    if (history) {
      logger.info("Fetched expression from db\n" + JSON.stringify(history));
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
      logger.error("Invalid expression" + expression);
      return res.status(400).json({ error: Errors.INVALID_EXPRESSION });
    }

    try {
      result = calculator.evaluate(expression);
    } catch (error) {
      logger.error(error);
      return res.status(400).json({ error: Errors.INVALID_EXPRESSION });
    }

    // save expression to db
    Expression.create({
      expression,
      result,
    }).then(() => {
      logger.info(`Result: ${result}`);

      return res.status(200).json({ data: result.toString() });
    });
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

export const getLastExpressions = (req: Request, res: Response) => {
  const { limit } = req.query;

  if (limit && (+limit < 0 || +limit > QUERY_LIMIT)) {
    return res.status(400).json({ error: Errors.INVALID_LIMIT });
  }

  try {
    Expression.findMany(
      {},
      {
        $sort: {
          updatedAt: -1,
        },
        $limit: +(limit || HISTORY_SIZE),
      }
    ).then((result) => {
      const dataSerialized = result.map((result) => ({
        ...result,
        result: result.result.toString(),
      }));

      return res.status(200).json({ data: dataSerialized });
    });
  } catch (error) {
    logger.error(error);
    res.sendStatus(500).json({ error: Errors.NO_CONNECTION });
  }
};
