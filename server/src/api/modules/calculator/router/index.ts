import { evaluateValidator, getExpressionsValidator } from "./services";
import { Router } from "express";
import { evaluate, getOperations, getConstants, getExpressions } from "../controller";

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
