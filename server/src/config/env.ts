import Joi from "joi";

export const TEST_DB_URL = "mongodb+srv://admin:admin@cluster0.kym1fnu.mongodb.net/?retryWrites=true&w=majority";

const portSchema = Joi.number().min(0).max(65536).default(3000).required();
export const PORT = portSchema.validate(process.env.PORT).value;

const dbUrlSchema = Joi.string().required().default(TEST_DB_URL);
export const DB_URL = dbUrlSchema.validate(process.env.DB_URL).value;

const envSchema = Joi.string().valid("production", "development").required();
export const NODE_ENV = envSchema.validate(process.env.NODE_ENV).value;
