import { Router } from "express";
import { evaluate, getOperations, getConstants, getLastOperations } from "../controller";

const router = Router();

router.post("/evaluate", evaluate);

router.get("/operations", getOperations);

router.get("/constants", getConstants);

router.get("/last-operations", getLastOperations);

export { router as calculatorRoutes };
