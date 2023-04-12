import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import { calculatorRoutes } from "./api/modules/calculator/router";
import logger from "./logger";
import MongoDB from "./libs/MongoDB";

const app = express();
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.use(calculatorRoutes);

MongoDB.connect(process.env.DB_URL as string)
  .then(() => {
    logger.info("db connected");

    const port = process.env.SERVER_PORT || 7890;

    app.listen(port, () => {
      logger.info(`Server listening on ${port}`);
    });
  })
  .catch((err) => {
    logger.error(err);
  });
