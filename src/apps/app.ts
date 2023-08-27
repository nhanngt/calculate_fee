import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import transactionFeeRoutes from "@app/apps/routes/transactionFee.route";
import { configure } from "@app/infrastructure/configure/configure";

const app = express();
const port = configure.serverPort;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/transactions-fee", transactionFeeRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log({ configure });
  console.log(`Server is running on: http://localhost:${port}`);
});

export default app;
