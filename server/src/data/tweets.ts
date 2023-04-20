// @ts-ignore
import * as userRepository from "./auth.js";

type TweetData = {
  id: string;
  text: string;
  createdAt: Date;
  userId: string;
};

type Tweet = TweetData & {
  username?: string;
  name?: string;
  url?: string;
};

let tweets: TweetData[] = [
  {
    id: "1",
    text: "송홍규 화이팅!!!!!!!",
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

export async function getAll(): Promise<Tweet[]> {
  return Promise.all(
    tweets.map(async (tweet) => {
      const user = await userRepository.findById(tweet.userId);
      return {
        ...tweet,
        username: user?.username,
        name: user?.name,
        url: user?.url,
      };
    })
  );
}

export async function getAllByUsername(username: string): Promise<Tweet[]> {
  return getAll().then((tweets) =>
    tweets.filter((tweet) => tweet.username === username)
  );
}

export async function getById(id: string): Promise<Tweet | null> {
  const found = tweets.find((tweet) => tweet.id === id);
  if (!found) {
    return null;
  }
  const user = await userRepository.findById(found.userId);
  return {
    ...found,
    username: user?.username,
    name: user?.name,
    url: user?.url,
  };
}

export async function create(text: string, userId: string): Promise<Tweet> {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    userId,
  };
  tweets = [tweet, ...tweets];
  return (await getById(tweet.id))!;
}

export async function update(id: string, text: string): Promise<Tweet> {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return (await getById(id))!;
}

export async function remove(id: string): Promise<void> {
  tweets.filter((t) => t.id !== id);
}
