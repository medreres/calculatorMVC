import { Request, Response } from "express";

import { Expression } from "../model";

import { Errors } from "@/config";
import { SortingValue } from "@/libs/Db";
import logger from "@/logger";

export const evaluate = (req: Request, res: Response) => {
  const expression = req.body.expression as string;
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
  const { limit, sort, skip } = req.query;

  logger.info("GET /expressions");
  logger.info(`limit, sort, skip: ${limit}, ${sort}, ${skip}`);

  let property = "updatedAt";
  let order: SortingValue = "desc";

  const request = Expression.findMany({});

  if (typeof sort === "string") {
    [property, order] = sort.split(":") as [string, SortingValue];
    request.sort({
      [property]: order,
    });
  }

  if (limit) {
    request.limit(+limit);
  }

  if (skip) {
    request.skip(+skip);
  }

  try {
    return request.exec().then((result) => {
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
