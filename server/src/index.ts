import cors from "cors";
import express from "express";
import { calculatorRoutes } from "./routes/calculator";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(calculatorRoutes);

const port = process.env.SERVER_PORT || 7890;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
