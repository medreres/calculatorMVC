import express from "express";
import { Expression } from "@/api/modules/calculator/model";
import MongoDB from "@/libs/MongoDB";
import { calculatorRoutes } from "@/api/modules/calculator/router";

const TEST_DB_URL = "mongodb+srv://admin:admin@cluster0.kym1fnu.mongodb.net/?retryWrites=true&w=majority";

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
