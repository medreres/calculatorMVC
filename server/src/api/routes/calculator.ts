import { Router } from "express";
import calculatorController from "../controllers/calculatorController";

const router = Router();

router.get("/evaluate", calculatorController.evaluate);

router.get("/operations", calculatorController.getOperations);

// TODO getConstants route

export { router as calculatorRoutes };
