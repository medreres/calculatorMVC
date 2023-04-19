import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import { calculatorRoutes } from "./api/modules/calculator/router";
import logger from "./logger";
import { DB, DB_URL, PORT } from "./config";

const app = express();
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.use(calculatorRoutes);

// TODO everything should be logged
// TODO sort imports
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
