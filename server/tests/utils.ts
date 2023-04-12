import express from "express";
import { Expression } from "@/api/modules/calculator/model";
import MongoDB from "@/libs/MongoDB";
import { calculatorRoutes } from "@/api/modules/calculator/router";
import { TEST_DB_URL } from "@/config";

export async function initializeDb() {
  await MongoDB.connect(TEST_DB_URL);
  await Expression.deleteMany({});
}

export async function clearDb() {
  return MongoDB.disconnect();
}

export function initializeApp() {
  const app = express();

  app.use(express.json()); // to support JSON-encoded bodies
  app.use(express.urlencoded({ extended: true }));

  app.use(calculatorRoutes);

  return app;
}
