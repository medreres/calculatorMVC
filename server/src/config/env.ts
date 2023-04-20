import { z } from "zod";

// for testing purposes
export const MONGODB_TEST_URL = "mongodb://localhost:27017";
export const POSTGRES_TEST_URL = "postgres://postgres:admin@localhost:5432/Calculator";

const portSchema = z.number().min(0).max(65536).default(3000);
export const PORT = portSchema.parse(process.env.PORT);

const dbUrlSchema = z.string().default(POSTGRES_TEST_URL);
export const DB_URL = dbUrlSchema.parse(process.env.DB_URL);

const envSchema = z.string().default("development");
export const NODE_ENV = envSchema.parse(process.env.NODE_ENV);
