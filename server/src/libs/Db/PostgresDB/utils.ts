import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

import { Document } from "../interfaces";

import PostgresDB from ".";

import logger from "@/logger";

export const initializeTable = async (collectionName: string, schema: z.AnyZodObject) => {
  const properties = Object.entries(getProperties(schema));

  return PostgresDB.client.schema.hasTable(collectionName).then((hasTable) => {
    if (hasTable) {
      return;
    }

    return PostgresDB.client.schema
      .createTable(collectionName, (table) => {
        table.increments("id");

        properties.forEach(([key, value]) => {
          let mainAttribute;

          if (value.type === "string") {
            mainAttribute = table.string(key);
          } else if (value.type === "number") {
            mainAttribute = table.double(key);
          } else if (value.type === "date-time") {
            mainAttribute = table.date(key);
          }

          if (value.default) {
            mainAttribute?.defaultTo(value.default);
          }
        });
      })
      .then(() => {
        logger.info("Tables made");
      });
  });
};

// utility
type IProperties<T> = {
  [P in keyof T]: {
    type: T[P];
    required?: boolean;
    default?: T[P];
  };
};
function getProperties<T extends z.AnyZodObject>(schema: T) {
  const keys: IProperties<T> = (zodToJsonSchema(schema) as any).properties;
  return keys;
}

export type InferType<T extends z.AnyZodObject> = z.infer<T> & Document;
