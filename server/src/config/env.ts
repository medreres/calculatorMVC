import { z } from "zod";

export const TEST_DB_URL = "mongodb://localhost:27017";

const portSchema = z.number().min(0).max(65536).default(3000);
export const PORT = portSchema.parse(process.env.PORT);

const dbUrlSchema = z.string().default(TEST_DB_URL);
export const DB_URL = dbUrlSchema.parse(process.env.DB_URL);

const envSchema = z.union([z.literal("production"), z.literal("development")]).default("development");
export const NODE_ENV = envSchema.parse(process.env.NODE_ENV);
