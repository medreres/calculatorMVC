import { Errors, HISTORY_SIZE } from "@/config";
import { Request, Response } from "express";
import logger from "@/logger";
import { Expression } from "../model";
import { calculator } from "./services";
import { SortingValue } from "@/libs/Db";

export const evaluate = (req: Request, res: Response) => {
  let expression = req.body.expression as string;
  logger.info("Expression: " + expression);

  // trim all whitespace
  expression = expression.replaceAll(" ", "");

  // find this expression in db, if exists - return result
  Expression.findOne({ expression }).then((history) => {
    if (history) {
      logger.info("Fetched expression from db\n" + JSON.stringify(history));
      // TODO _id is not good
      Expression.updateOne(
        {
          id: history.id,
        },
        // TODO $set is not a good approach
        {
          updatedAt: new Date(),
        }
      ).then((res) => console.log(res));

      return res.status(200).json({ data: history.result.toString() });
    }

    let result: number;

    if (!calculator.isExpressionValid(expression)) {
      logger.error(`Invalid expression ${expression}`);
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
  let property: string = "updatedAt";
  let order: SortingValue = "desc";

  if (typeof sort === "string") {
    [property, order] = sort.split(":") as [string, SortingValue];
  }

  try {
    Expression.findMany({})
      .sort({
        [property]: order,
      })
      .limit(+limit)
      .skip(+skip)
      .exec()
      .then((result) => {
        const dataSerialized = result.map((result) => {
          return {
            ...result,
            result: result.result.toString(),
          };
        });

        return res.status(200).json({ data: dataSerialized });
      });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
