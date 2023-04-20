// @ts-ignore
import * as userRepository from "./auth.js";

type Tweets = {
  id: string;
  text: string;
  createdAt: Date;
  userId: string;
};

let tweets: Tweets[] = [
  {
    id: "1",
    text: "송홍규 화이팅!",
    createdAt: new Date(),
    userId: "1",
  },
  {
    id: "2",
    text: ":( 2 화이팅!",
    createdAt: new Date(),
    userId: "1",
  },
];

export async function getAll() {
  return Promise.all(
    tweets.map(async (tweet) => {
      const { username, name, url } = await userRepository.findById(
        tweet.userId
      );
      return { ...tweet, username, name, url };
    })
  );
}

export async function getAllByUsername(username: string) {
  return getAll().then((tweets) =>
    tweets.filter((tweet) => tweet.username === username)
  );
}

export async function getById(id: string) {
  const found = tweets.find((tweet) => tweet.id === id);
  if (!found) {
    return null;
  }
  const { username, name, url } = await userRepository.findById(found.userId);
  return { ...found, username, name, url };
}

export async function create(text: string, userId: string) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    userId,
  };
  tweets = [tweet, ...tweets];
  return getById(tweet.id);
}

export async function update(id: string, text: string) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return getById(tweet.id);
}

export async function remove(id: string) {
  tweets.filter((t) => t.id !== id);
}
