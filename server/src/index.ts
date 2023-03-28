import cors from "cors";
import express from "express";
import { calculatorRoutes } from "./routes/calculator";

const app = express();

// TODO small doc for api
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(calculatorRoutes);

// ? both port could be already used?
const port = process.env.SERVER_PORT || 7890;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
