import { Request, Response } from "express";

import { Expression } from "../model";

import { Errors } from "@/config";
import { QUERY_LIMIT } from "@/libs/Db";
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

  Expression.getExpressions({
    limit: +(limit || QUERY_LIMIT),
    sort: sort as string,
    skip: +(skip || 0),
  })
    .then((data) => res.status(200).json({ data }))
    .catch((err) => {
      logger.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
};
