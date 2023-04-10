import { Router } from "express";
import { evaluate, getOperations, getConstants, getLastExpressions } from "../controller";

const router = Router();

/**
 * @description evaluates expression
 * @param expression - expression to evaluate, must be stated in the body
 *  */
router.post("/evaluate", evaluate);

// return list of available operations
router.get("/operations", getOperations);

// return list of available constants
router.get("/constants", getConstants);

/**
 * @description returns last operations from history
 * @param limit - sets the max number of operations to return
 *  */
router.get("/expressions", getLastExpressions);

export { router as calculatorRoutes };
