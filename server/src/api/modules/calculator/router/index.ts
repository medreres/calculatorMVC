import { Router } from "express";
import { evaluate, getOperations, getConstants } from "../controller";
import "../../../model";

const router = Router();

router.get("/evaluate", evaluate);

router.get("/operations", getOperations);

router.get("/constants", getConstants);

export { router as calculatorRoutes };
