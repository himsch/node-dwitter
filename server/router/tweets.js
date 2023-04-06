import express from "express";
import "express-async-error";
import * as tweetsRepository from "../data/tweets.js";

const router = express.Router();

router
  .get("/", (req, res) => {
    const { username } = req.query;
    const data = username
      ? tweetsRepository.getAllByUsername(username)
      : tweetsRepository.getAll();

    res.status(200).json(data);
  })
  .post("/", (req, res) => {
    const { text, username, name } = req.body;
    const tweet = tweetsRepository.create(text, name, username);
    res.status(201).json(tweet);
  });

router
  .get("/:id", (req, res) => {
    const { id } = req.params;
    const tweet = tweetsRepository.getById(id);
    if (tweet) {
      res.status(200).json(tweet);
    } else {
      res.status(404).json({ message: `Tweet id(${id}) not found` });
    }
  })
  .put("/:id", (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const tweet = tweetsRepository.update(id, text);
    if (tweet) {
      res.status(200).json(tweet);
    } else {
      res.status(400).send({ message: `Tweet id(${id}) not found` });
    }
  })
  .delete("/:id", (req, res) => {
    const { id } = req.params;
    tweetsRepository.remove(id);
    res.sendStatus(204);
  });

export default router;
