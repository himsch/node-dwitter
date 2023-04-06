import express from "express";
import "express-async-error";

let tweets = [
  {
    id: "1",
    text: "송홍규 화이팅!",
    createAt: Date.now().toString(),
    name: "Bob",
    username: "bob",
    url: "",
  },
  {
    id: "2",
    text: ":( 2 화이팅!",
    createAt: Date.now().toString(),
    name: "SONG",
    username: "song",
    url: "",
  },
];
const router = express.Router();

router
  .get("/", (req, res) => {
    const { username } = req.query;
    const data = username
      ? tweets.filter((t) => t.username === username)
      : tweets;

    res.status(200).json(data);
  })
  .post("/", (req, res) => {
    const { text, username, name } = req.body;
    const tweet = {
      id: Date.now().toString(),
      text,
      createAt: new Date(),
      name,
      username,
    };
    tweets = [tweet, ...tweets];
    res.status(201).json(tweet);
  });

router
  .get("/:id", (req, res) => {
    const { id } = req.params;
    const tweet = tweets.find((t) => t.id === id);
    if (tweet) {
      res.status(200).json(tweet);
    } else {
      res.status(404).json({ message: `Tweet id(${id}) not found` });
    }
  })
  .put("/:id", (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const tweet = tweets.find((t) => t.id === id);
    if (tweet) {
      tweet.text = text;
      res.status(200).json(tweet);
    } else {
      res.status(400).send({ message: `Tweet id(${id}) not found` });
    }
  })
  .delete("/:id", (req, res) => {
    const { id } = req.params;
    tweets = tweets.filter((t) => t.id !== id);
    res.sendStatus(204);
  });

export default router;
