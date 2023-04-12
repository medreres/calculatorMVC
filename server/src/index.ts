import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import { calculatorRoutes } from "./api/modules/calculator/router";
import logger from "./logger";
import MongoDB from "./libs/MongoDB";
import { DB_URL, PORT } from "./config";

const app = express();
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.use(calculatorRoutes);

MongoDB.connect(DB_URL as string)
  .then(() => {
    logger.info("db connected");

    app.listen(PORT, () => {
      logger.info(`Server listening on ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error(err);
  });
