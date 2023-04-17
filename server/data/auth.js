import { ObjectId } from "mongodb";
import { getUsers } from "../database/database.js";

export const findByUsername = async (username) => {
  return getUsers() //
    .findOne({ username })
    .then(mapOptionalUser);
};

export const findById = async (id) => {
  return getUsers()
    .findOne({ _id: new ObjectId(id) })
    .then(mapOptionalUser);
};

export const createUser = async (user) => {
  return getUsers()
    .insertOne(user)
    .then((result) => result.insertedId.toString());
};

// map 은 a를 받아서 b로 변환해서 리턴, user가 있을수도 null일 수도 있으니 optional
function mapOptionalUser(user) {
  return user ? { ...user, id: user._id.toString() } : user;
}
