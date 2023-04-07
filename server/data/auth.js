import bcrypt from "bcrypt";

let users = [];

export const create = async (body) => {
  const hash = await bcrypt.hash(body.password, 10);
  const user = {
    id: Date.now().toString(),
    ...body,
    password: hash,
    createdAt: new Date(),
  };
  users = [...users, user];
  return user;
};

export const isExist = (username) => {
  const user = users.find((u) => u.username === username);
  return !!user;
};

export const get = async ({ username, password }) => {
  const user = users.find((u) => u.username === username);
  if (!user) {
    throw new Error(`no user`);
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("invalid password");
  }
  return user;
};
