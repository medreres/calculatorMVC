import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { calculatorRoutes } from "./api/modules/calculator/router";
import MongoDB from "./libs/MongoDB/MongoDB";

//TODO cache should not be cleared
//TODO history implementation
const app = express();
app.use(express.json()); // to support JSON-encoded bodies
app.use(cors({ origin: "*" }));
dotenv.config();

app.use(calculatorRoutes);

MongoDB.connect(process.env.DB_URL as string)
  .then(() => {
    console.log("db connected");

    const port = process.env.SERVER_PORT || 7890;
    app.listen(port, () => {
      console.log(`Server listening on ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
