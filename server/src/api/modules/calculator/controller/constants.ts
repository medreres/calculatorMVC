import { Request, Response } from "express";

import { Expression } from "../model";

export const getOperations = (_req: Request, res: Response) => {
  res.status(200).json({ data: Expression.getOperationSymbols() });
};

export const getConstants = (_req: Request, res: Response) => {
  res.json({ data: Expression.getConstants() });
};
