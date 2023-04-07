import { Router } from "express";
import { evaluate, getOperations, getConstants, getLastExpressions } from "../controller";

const router = Router();

router.post("/evaluate", evaluate);

router.get("/operations", getOperations);

router.get("/constants", getConstants);

router.get("/expressions", getLastExpressions);

export { router as calculatorRoutes };
