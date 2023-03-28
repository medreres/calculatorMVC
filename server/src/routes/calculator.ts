import { Router } from "express";
import { calculatorConfig } from "../config";
import Calculator from "../lib/Calculator";

const router = Router();

const calculator = new Calculator();

// TODO better error handling
router.get("/calculate", (req, res) => {
  const expr = req.query.expression as string;

  if (!expr) {
    res.status(400).json({ error: calculatorConfig.errorsDescription.MISSING_EXPRESSION });
  }

  let result: number | undefined;

  if (!calculator.isExpressionValid(expr)) {
    res.status(400).json({ error: calculatorConfig.errorsDescription.INVALID_EXPRESSION });
  }

  try {
    result = calculator.evaluate(expr);
  } catch (error) {
    res.status(400).send(calculatorConfig.errorsDescription.INVALID_EXPRESSION);
  }

  res.status(200).json({ result });
});

export { router as calculatorRoutes };
