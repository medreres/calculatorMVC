import { z } from "zod";
import { CREATED_AT, UPDATED_AT } from "./config";

export const defaultProperties = z.object({
  [CREATED_AT]: z.date().default(new Date()),
  [UPDATED_AT]: z.date().default(new Date()),
});
