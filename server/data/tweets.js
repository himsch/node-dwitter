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

export function getAll() {
  return tweets;
}

export function getAllByUsername(username) {
  return tweets.filter((t) => t.username === username);
}

export function getById(id) {
  return tweets.find((tweet) => tweet.id === id);
}

export function create(text, name, username) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createAt: new Date(),
    name,
    username,
  };
  tweets = [tweet, ...tweets];
  return tweets;
}

export function update(id, text) {
  const tweet = tweets.find((t) => t.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return tweet;
}

export function remove(id) {
  tweets.filter((t) => t.id !== id);
}
