import { Errors, HISTORY_SIZE } from "../../../../config";
import { Request, Response } from "express";
import logger from "../../../../logger";
import Expression from "../model";
import { calculator } from "./services";

export const evaluate = (req: Request, res: Response) => {
  let expression = req.body.expression as string;
  logger.info("Expression: " + expression);

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

interface IGetExpressions {
  limit: number;
  skip: number;
  sort: string;
}
export const getExpressions = (req: Request, res: Response) => {
  // data is already validated
  const { limit = HISTORY_SIZE, sort = "updatedAt:desc", skip = 0 } = req.query as unknown as IGetExpressions;
  const [property, order] = sort.split(":");

  try {
    Expression.findMany(
      {},
      {
        $sort: {
          [property]: order == "asc" ? 1 : -1,
        },
        $limit: +limit,
        $skip: +skip,
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
    return res.status(500).json({ error: "Internal server error" });
  }
};
