import { MongoDB, PostgresDB } from "@/libs/Db";
const availableDb = {
  MongoDB,
  PostgresDB,
};

export const DB = availableDb.PostgresDB;
