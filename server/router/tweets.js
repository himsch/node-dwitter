import express from "express";
import "express-async-error";
import * as tweetsController from "../controller/tweets.js";

const router = express.Router();

router
  .get("/", tweetsController.getTweets)
  .post("/", tweetsController.createTweet);

router
  .get("/:id", tweetsController.getTweet)
  .put("/:id", tweetsController.updateTweet)
  .delete("/:id", tweetsController.removeTweet);

export default router;
