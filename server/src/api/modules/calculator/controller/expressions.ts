import { Errors, HISTORY_SIZE } from "@/config";
import { Request, Response } from "express";
import logger from "@/logger";
import { Expression } from "../model";
import { SortingValue } from "@/libs/Db";

export const evaluate = (req: Request, res: Response) => {
  let expression = req.body.expression as string;
  logger.info("Expression: " + expression);

  return Expression.evaluate(expression)
    .then((result) => {
      logger.info(`Calculated expression: ${expression}.\nSending result (${result}) to client.`);
      return res.status(200).json({ data: result });
    })
    .catch((err) => {
      logger.error(err);
      return res.status(400).json({ error: Errors.INVALID_EXPRESSION });
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
    return Expression.findMany({})
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
