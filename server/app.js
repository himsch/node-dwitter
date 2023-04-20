import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import "express-async-error";
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import { isAuth } from "./middleware/auth.js";
import { config } from "./config.js";
import { initSocket } from "./connection/socket.js";
import { sequelize } from "./db/database.js";
import cookieParser from "cookie-parser";
import { csrfCheck } from "./middleware/csrf.js";
import rateLimit from "./middleware/rate-limiter.js";
import yaml from "yamljs";
import swaggerUI from "swagger-ui-express";

const app = express();
const corsOption = {
  origin: config.cors.allowedOrigin,
  optionsSuccessStatus: 200,
  credentials: true, // allow the "Access-Control-Allow-Credentials" Header
};
const openAPIDocument = yaml.load("./api/openapi.yaml");
app.use(morgan("tiny"));
app.use(cors(corsOption));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(rateLimit);
app.use(csrfCheck);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openAPIDocument));
app.use("/auth", authRouter);
app.use("/tweets", [isAuth, tweetsRouter]);

app.use((req, res, next) => {
  res.sendStatus(404);
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
});

sequelize.sync().then(() => {
  console.log(`Server is Started... ${new Date()}`);
  const server = app.listen(config.port);
  initSocket(server);
});
