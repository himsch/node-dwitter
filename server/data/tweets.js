let tweets = [
  {
    id: "1",
    text: "송홍규 화이팅!",
    createdAt: Date.now().toString(),
    name: "Bob",
    username: "bob",
    url: "",
  },
  {
    id: "2",
    text: ":( 2 화이팅!",
    createdAt: Date.now().toString(),
    name: "SONG",
    username: "song",
    url: "",
  },
];

export async function getAll() {
  return tweets;
}

export async function getAllByUsername(username) {
  return tweets.filter((t) => t.username === username);
}

export async function getById(id) {
  return tweets.find((tweet) => tweet.id === id);
}

export async function create(text, name, username) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  tweets = [tweet, ...tweets];
  return tweet;
}

export async function update(id, text) {
  const tweet = tweets.find((t) => t.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return tweet;
}

export async function remove(id) {
  tweets.filter((t) => t.id !== id);
}
