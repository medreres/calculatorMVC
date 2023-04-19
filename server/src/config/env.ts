import { z } from "zod";

export const MONGODB_TEST_URL = "mongodb://localhost:27017";

export const POSTGRES_TEST_URL = "postgres://postgres:admin@localhost:5432/Calculator";

export const POSTGRES_DB_URL =
  "postgres://jfaqegnl:btVLu-1srJqR2WfMzFk0cwCWbJgRsjpZ@mahmud.db.elephantsql.com/jfaqegnl";

const portSchema = z.number().min(0).max(65536).default(3000);
export const PORT = portSchema.parse(process.env.PORT);

// TODO custom error messages
// TODO switch db url
const dbUrlSchema = z.string().default(POSTGRES_DB_URL);
export const DB_URL = dbUrlSchema.parse(process.env.DB_URL);

const envSchema = z.string().default("development");
export const NODE_ENV = envSchema.parse(process.env.NODE_ENV);
