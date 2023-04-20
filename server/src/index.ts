import cors from "cors";
import { config } from "dotenv";
config();
import express, { json, urlencoded } from "express";

import { calculatorRoutes } from "./api/modules/calculator/router";
import { DB, DB_URL, PORT } from "./config";
import logger from "./logger";

const app = express();
app.use(json()); // to support JSON-encoded bodies
app.use(urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.use(calculatorRoutes);

DB.connect(DB_URL)
  .then(() => {
    logger.info("Db connected.");

    app.listen(PORT, () => {
      logger.info(`Server listening on ${PORT}.`);
    });
  })
  .catch((err) => {
    logger.error(err);
  });
