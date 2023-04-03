import { Router } from "express";
import { evaluate, getOperations, getConstants, getLastOperations } from "../controller";
import "../../../model";

const router = Router();

router.get("/evaluate", evaluate);

router.get("/operations", getOperations);

router.get("/constants", getConstants);

router.get("/last-operations", getLastOperations);

export { router as calculatorRoutes };
