import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import { calculatorRoutes } from "./api/modules/calculator/router";
import MongoDB from "./api/modules/calculator/MongoDB/Mongo";

const app = express();
app.use(cors({ origin: "*" }));

app.use(calculatorRoutes);

MongoDB.connect(process.env.DB_URL as string).then(() => {
  console.log("db connected");
});
const port = process.env.SERVER_PORT || 7890;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
