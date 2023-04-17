import * as userRepository from "./auth.js";
import { getTweets } from "../database/database.js";
import { ObjectId } from "mongodb";

export async function getAll() {
  return getTweets() //
    .find({})
    .sort({ createAt: -1 })
    .toArray()
    .then(mapTweets);
}

export async function getAllByUsername(username) {
  return getTweets() //
    .find({ username })
    .toArray()
    .then(mapTweets);
}

export async function getById(id) {
  return getTweets() //
    .findOne({ _id: new ObjectId(id) })
    .then(mapOptionalTweet);
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
  return getTweets() //
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { text } },
      { returnDocument: "after" } // "수정 후" 의 데이터를 리턴 해준다.
    )
    .then((result) => result.value)
    .then(mapOptionalTweet);
}

export async function remove(id) {
  getTweets().deleteOne({ _id: new ObjectId(id) });
}

function mapOptionalTweet(tweet) {
  return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
}

function mapTweets(tweets) {
  return tweets.map(mapOptionalTweet);
}
