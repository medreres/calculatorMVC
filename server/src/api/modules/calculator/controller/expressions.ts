import { Errors, HISTORY_SIZE } from "@/config";
import { Request, Response } from "express";
import logger from "@/logger";
import { Expression } from "../model";
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

export const getExpressions = (req: Request, res: Response) => {
  const { limit = HISTORY_SIZE, sort, skip = 0 } = req.query;
  let property, order;

  if (typeof sort === "string") {
    [property, order] = sort.split(":");
  } else {
    [property, order] = ["updatedAt", "desc"];
  }

  try {
    Expression.findMany({})
      .limit(+limit)
      .skip(+skip)
      .sort({
        [property]: order,
      })
      .toArray()
      .then((result) => {
        // result[0].
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
