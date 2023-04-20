import { body, check } from "express-validator";

import { errorHandler } from "../middleware";

import { QUERY_LIMIT } from "@/libs/Db/MongoDB";


export const evaluateValidator = [
  body("expression").isString().isLength({
    min: 1,
  }),
  errorHandler,
];

export const getExpressionsValidator = [
  check("limit")
    .optional()
    .isInt({
      min: 1,
      max: QUERY_LIMIT,
    })
    .withMessage(`Must be an integer within range 0-${QUERY_LIMIT}`),
  check("skip").optional().isInt({
    min: 0,
  }),
  check("sort")
    .optional()
    .isString()
    .custom((value: string) => {
      const args = value.split(":");
      if (!(args.length === 2)) {
        throw new Error("Does not math pattern. Must be key:value");
      }

      if (args[1] !== "asc" && args[1] !== "desc") {
        throw new Error("Sorting value must be either 'asc' or 'desc'");
      }

      return true;
    }),
  errorHandler,
];
