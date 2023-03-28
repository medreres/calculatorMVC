import express from "express";
import { calculatorRoutes } from "./routes/calculator";

const app = express();

app.use(calculatorRoutes);

// ? both port could be already used?
const port = process.env.SERVER_PORT || 7890;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
