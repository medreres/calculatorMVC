import express from "express";

import { calculatorRoutes } from "@/api/modules/calculator/router";
import { DB, MONGODB_TEST_URL, POSTGRES_TEST_URL } from "@/config";

export type IExpression = {
  expression: string;
  result: string;
};
export const validTestCases: IExpression[] = [
  { expression: "1+5", result: "6" },
  { expression: "1+13", result: "14" },
  { expression: "5%3+3", result: "5" },
  { expression: "sin0+5*(3+2)", result: "25" },
  { expression: "0+10", result: "10" },
];

export const invalidTestCases = ["1*", "1-", "(", "()", "2*(3-", "asd", "#", "#=#132", "13-12312+#"];

const TEST_URLS = {
  MONGODB_TEST_URL,
  POSTGRES_TEST_URL,
};

export async function initializeDb() {
  await DB.connect(TEST_URLS.POSTGRES_TEST_URL);
}

export async function clearDb() {
  return DB.disconnect();
}

export function initializeApp() {
  const app = express();

  app.use(express.json()); // to support JSON-encoded bodies
  app.use(express.urlencoded({ extended: true }));

  app.use(calculatorRoutes);

  return app;
}
