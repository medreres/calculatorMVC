import { z } from "zod";
import { CREATED_AT, UPDATED_AT } from "./config";

export const defaultProperties = z.object({
  [CREATED_AT]: z.date().default(new Date()),
  [UPDATED_AT]: z.date().default(new Date()),
});

export const renameProperty = (obj: object, old_key: string, new_key: string) => {
  if (old_key !== new_key) {
    Object.defineProperty(obj, new_key, Object.getOwnPropertyDescriptor(obj, old_key)!);
    delete obj[old_key as keyof typeof obj];
  }
};
