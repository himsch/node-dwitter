import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import "express-async-error";
import tweetsRouter from "./router/tweets.js";

const app = express();
const option = {};

app.use(morgan("tiny"));
app.use(cors(option));
app.use(helmet());
app.use(express.json());

app.use("/tweets", tweetsRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
});
app.listen(8080);