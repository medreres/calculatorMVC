import { Router } from "express";

import { evaluateValidator, getExpressionsValidator } from "./services";
import { evaluate, getConstants, getExpressions, getOperations } from "../controller";
import { Expression } from "../model";

const router = Router();

/**
 * @description evaluates expression
 * @param expression - expression to evaluate, must be stated in the body
 *  */
router.post("/expression", evaluateValidator, evaluate);

// return list of available operations
router.get("/operations", getOperations);

// return list of available constants
router.get("/constants", getConstants);

router.get("/test", (_req, res) => {
  Expression.findOne({
    or: [
      {
        expression: "1+52",
      },
      {
        expression: "5%3-1051+1232",
      },
      {
        result: 25,
      },
      {
        result: -12326,
      },
    ],
  }).then((result) => {
    res.send(result);
  });
});

/**
 * @description returns all the expressions
 * @param {number} limit - limits number of documents returned, (0 - QUERY_LIMIT). QUERY_LIMIT in config MongoDB.
 * @param {number} skip - skip n number of documents
 * @param {string} sort - sort documents by parameter, could be 'asc' or 'desc'
 * For example
 *  updatedAt:asc
 */
router.get("/expressions", getExpressionsValidator, getExpressions);

export { router as calculatorRoutes };
