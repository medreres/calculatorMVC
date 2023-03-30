import cors from "cors";
import express from "express";
import { calculatorRoutes } from "./api/routes/calculator";
import dotenv from "dotenv";

const app = express();

dotenv.config();
app.use(cors({ origin: "*" }));

//? versioning of api
app.use(calculatorRoutes);

const port = process.env.SERVER_PORT || 7890;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
