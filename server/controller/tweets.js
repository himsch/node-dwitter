import * as tweetsRepository from "../data/tweets.js";

export const getTweets = (req, res) => {
  const { username } = req.query;
  const data = username
    ? tweetsRepository.getAllByUsername(username)
    : tweetsRepository.getAll();

  res.status(200).json(data);
};

export const getTweet = (req, res) => {
  const { id } = req.params;
  const tweet = tweetsRepository.getById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
};

export const createTweet = (req, res) => {
  const { text, username, name } = req.body;
  const tweet = tweetsRepository.create(text, name, username);
  res.status(201).json(tweet);
};

export const updateTweet = (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const tweet = tweetsRepository.update(id, text);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(400).send({ message: `Tweet id(${id}) not found` });
  }
};

export const removeTweet = (req, res) => {
  const { id } = req.params;
  tweetsRepository.remove(id);
  res.sendStatus(204);
};
