import { Router } from "express";
import { calculatorConfig } from "../config";
import Calculator from "../lib/Calculator";

const router = Router();

const calculator = new Calculator();

// TODO better error handling
router.get("/evaluate", (req, res) => {
  const expr = req.query.expression as string;

  if (!expr) {
    return res.status(400).json({ error: calculatorConfig.errorsDescription.MISSING_EXPRESSION });
  }

  let result: number | undefined;

  if (!calculator.isExpressionValid(expr)) {
    return res.status(400).json({ error: calculatorConfig.errorsDescription.INVALID_EXPRESSION });
  }

  try {
    result = calculator.evaluate(expr);
  } catch (error) {
    return res.status(400).send(calculatorConfig.errorsDescription.INVALID_EXPRESSION);
  }

  res.status(200).json({ result });
});

router.get("/operations", (req, res) => {
  const operations = calculator.getOperations();
  const operationsSymbols = operations.map((operation) => operation.symbol);

  res.status(200).json({ operations: operationsSymbols });
});

export { router as calculatorRoutes };
