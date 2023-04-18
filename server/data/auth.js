import mongoose from "mongoose";

import { ObjectId } from "mongodb";
import { getUsers, useVirtualId } from "../database/database.js";

const userSchema = new mongoose.Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
  name: { type: String, require: true },
  email: { type: String, require: true },
  url: String,
});

useVirtualId(userSchema);
const User = mongoose.model("User", userSchema);

export const findByUsername = async (username) => {
  return User.findOne({ username });
};

export const findById = async (id) => {
  return User.findById(id);
};

export const createUser = async (user) => {
  return new User(user).save().then((data) => data.id);
};
