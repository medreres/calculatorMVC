import express from "express";
import { Expression } from "@/api/modules/calculator/model";
import MongoDB from "@/libs/Db/MongoDB";
import { calculatorRoutes } from "@/api/modules/calculator/router";
import { DB, MONGODB_TEST_URL, POSTGRES_TEST_URL } from "@/config";

const TEST_URLS = {
  MONGODB_TEST_URL,
  POSTGRES_TEST_URL,
};

export async function initializeDb() {
  await DB.connect(TEST_URLS.POSTGRES_TEST_URL);
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
