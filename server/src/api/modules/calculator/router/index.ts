import { Router } from "express";
import { evaluate, getOperations, getConstants, getLastExpressions } from "../controller";

const router = Router();
// evaluates expression
router.post("/evaluate", evaluate);

// return list of available operations
router.get("/operations", getOperations);

// return list of available constants
router.get("/constants", getConstants);

// returns last operations from history
router.get("/expressions", getLastExpressions);

export { router as calculatorRoutes };
