let users = [
  {
    id: "1",
    username: "bob",
    password: "$2b$12$G9",
    name: "Bob",
    email: "bob@gmail.com",
    url: "",
  },
];

export const findByUsername = (username) => {
  return users.find((u) => u.username === username);
};

export const createUser = async (user) => {
  const created = { ...user, id: Date.now().toString() };
  users = [...users, created];
  return user.id;
};
