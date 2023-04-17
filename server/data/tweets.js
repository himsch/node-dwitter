import * as userRepository from "./auth.js";
import { getTweets } from "../database/database.js";
import { findById } from "./auth.js";
import { ObjectId } from "mongodb";

let tweets = [
  {
    id: "1",
    text: "송홍규 화이팅!",
    createdAt: new Date().toString(),
    userId: "1",
  },
  {
    id: "2",
    text: ":( 2 화이팅!",
    createdAt: new Date().toString(),
    userId: "1",
  },
];

export async function getAll() {
  return getTweets().find({}).toArray();
}

export async function getAllByUsername(username) {
  return getTweets().find({ username }).toArray();
}

export async function getById(id) {
  return getTweets().findOne({ _id: new ObjectId(id) });
}

export async function create(text, userId) {
  const { username, name, url } = await userRepository.findById(userId);
  return getTweets()
    .insertOne({
      text,
      createdAt: new Date().toString(),
      username,
      name,
      url,
      userId,
    })
    .then((result) => getById(result.insertedId.toString()));
}

export async function update(id, text) {
  console.log(id, text);
  return getTweets()
    .updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          text,
        },
      }
    )
    .then((result) => getById(id));
}

export async function remove(id) {
  getTweets().deleteOne({ _id: new ObjectId(id) });
}
