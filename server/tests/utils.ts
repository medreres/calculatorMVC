import express from "express";
import Expression from "../src/api/modules/calculator/model";
import { calculatorRoutes } from "../src/api/modules/calculator/router";
import MongoDB from "../src/libs/MongoDB";

export async function initializeDb() {
  await MongoDB.connect("mongodb+srv://admin:admin@cluster0.kym1fnu.mongodb.net/?retryWrites=true&w=majority");
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
