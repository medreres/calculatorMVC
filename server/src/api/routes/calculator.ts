import { Router } from "express";
import calculatorController from "../controllers/calculatorController";

const router = Router();

router.get("/evaluate", calculatorController.evaluate);

router.get("/operations", calculatorController.getOperations);

router.get("/constants", calculatorController.getConstants);

export { router as calculatorRoutes };
