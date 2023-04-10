import jwt from "jsonwebtoken";
import * as userRepository from "../data/auth.js";
import "express-async-error";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

// @todo: Make it secure!
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtExpiresInDays = "2d";
const bcryptSaltRounds = 12;

export const signup = async (req, res) => {
  const { username, password, name, email, url } = req.body;
  const found = await userRepository.findByUsername(req.body.username);
  if (found) {
    return res.status(409).json({ message: `${username} already exists` }); // 409 Conflict.
  }

  const hashed = await bcrypt.hash(password, bcryptSaltRounds); // 해싱은 컨트롤러?
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  const token = createJwtToken(userId);
  return res.status(201).json({ token, username }); // 201, created
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  // error 처리도 컨트롤러?
  if (!user) {
    // 401 Unauthorized, 보안 민감한 정보는 상세한 정보를 제공하면 안됀다.
    return res.status(401).json({ message: "Invalid user or password" });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    // 401 Unauthorized, 보안 민감한 정보는 상세한 정보를 제공하면 안됀다.
    return res.status(401).json({ message: "Invalid user or password" });
  }
  const token = createJwtToken(user.id);
  return res.status(200).json({ token, username });
};

export const me = async (req, res) => {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ token: req.token, username: user.username });
};

const createJwtToken = (id) => {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
};
