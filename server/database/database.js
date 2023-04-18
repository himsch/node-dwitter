import mongoose from "mongoose";
import { config } from "../config.js";

export async function connectDB() {
  return mongoose.connect(config.db.host);
}

export function useVirtualId(schema) {
  // _id -> id
  schema.virtual("id").get(function () {
    return this._id.toString();
  });
  schema.set("toJSON", { virtuals: true }); // 설정한 가상 id를 json 포함.
  schema.set("toObject", { virtuals: true }); // 설정한 가상 id를 object 포함
}

export function getUsers() {
  return db.collection("users");
}

export function getTweets() {
  return db.collection("tweets");
}
