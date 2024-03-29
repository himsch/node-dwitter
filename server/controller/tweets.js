import * as tweetsRepository from "../data/tweets.js";
import { getSocketIO } from "../connection/socket.js";

export const getTweets = async (req, res) => {
  const { username } = req.query;
  const data = await (username
    ? tweetsRepository.getAllByUsername(username)
    : tweetsRepository.getAll());

  res.status(200).json(data);
};

export const getTweet = async (req, res) => {
  const { id } = req.params;
  const tweet = await tweetsRepository.getById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
};

export const createTweet = async (req, res) => {
  const { text } = req.body;
  const tweet = await tweetsRepository.create(text, req.userId);
  res.status(201).json(tweet);
  getSocketIO().emit("tweets", tweet);
};

export const updateTweet = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const prev = await tweetsRepository.getById(id);
  if (!prev) {
    return res.sendStatus(404);
  }
  if (prev.userId !== req.userId) {
    return res.sendStatus(403);
  }
  const tweet = await tweetsRepository.update(id, text);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(400).send({ message: `Tweet id(${id}) not found` });
  }
};

export const removeTweet = async (req, res) => {
  const { id } = req.params;
  const prev = await tweetsRepository.getById(id);
  if (!prev) {
    return res.sendStatus(404);
  }
  if (prev.userId !== req.userId) {
    return res.sendStatus(403);
  }
  await tweetsRepository.remove(id);
  res.sendStatus(204);
};
