import { z } from "zod";

import { DefaultProperties, IStaticDocument } from "./Document";
import { InferType } from "../PostgresDB/utils";

export enum AttributeKeys {
  LIMIT = "limit",
  SORT = "sort",
  SKIP = "skip",
  IN = "in",
  GT = "gt",
  LT = "lt",
  AND = "and",
  OR = "or",
  NOR = "nor",
  SET = "set",
  ID = "id",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
}

export interface IStaticDb {
  connect(url: string): Promise<void>;

  disconnect(): Promise<void>;

  model<T extends z.AnyZodObject>(name: string, schema: T): IStaticDocument<InferType<T> & DefaultProperties>;
}
