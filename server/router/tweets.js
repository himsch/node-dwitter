import express from "express";
import "express-async-error";
import * as tweetsController from "../controller/tweets.js";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";

const router = express.Router();

const validateTweet = [
  body("text")
    .trim()
    .isLength({ min: 3 })
    .withMessage("text should be at least 3 characters"),
  validate,
];

router
  .route("/")
  .get(tweetsController.getTweets)
  .post([validateTweet, tweetsController.createTweet]);

router
  .route("/:id")
  .get(tweetsController.getTweet)
  .put([validateTweet, tweetsController.updateTweet])
  .delete(tweetsController.removeTweet);

export default router;
