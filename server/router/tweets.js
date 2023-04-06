import express from "express";
import "express-async-error";
import * as tweetsController from "../controller/tweets.js";

const router = express.Router();

router
  .route("/")
  .get(tweetsController.getTweets)
  .post(tweetsController.createTweet);

router
  .route("/:id")
  .get(tweetsController.getTweet)
  .put(tweetsController.updateTweet)
  .delete(tweetsController.removeTweet);

export default router;
