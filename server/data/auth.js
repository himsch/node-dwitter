let users = [
  {
    id: "1",
    username: "bob",
    password: "$2b$12$K1MgXcN/if9eXD/i7smg9.e3kxamwzZFvI5KQ/slYH62ZCDULVRVC", // 12345
    name: "Bob",
    email: "bob@gmail.com",
    url: "",
  },
];

export const findByUsername = async (username) => {
  return users.find((u) => u.username === username);
};

export const findById = async (id) => {
  return users.find((u) => u.id === id);
};

export const createUser = async (user) => {
  const created = { ...user, id: Date.now().toString() };
  users = [...users, created];
  return user.id;
};
