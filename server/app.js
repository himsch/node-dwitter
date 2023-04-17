import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import "express-async-error";
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import { isAuth } from "./middleware/auth.js";
import { config } from "./config.js";
import { Server } from "socket.io";
import { initSocket } from "./connection/socket.js";
import { connectDB } from "./database/database.js";

const app = express();
const option = {};

app.use(morgan("tiny"));
app.use(cors(option));
app.use(helmet());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/tweets", [isAuth, tweetsRouter]);

app.use((req, res, next) => {
  res.sendStatus(404);
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
});

connectDB()
  .then(() => {
    console.log("DB Connected!!");
    const server = app.listen(config.host.port);
    initSocket(server);
  })
  .catch(console.error);
