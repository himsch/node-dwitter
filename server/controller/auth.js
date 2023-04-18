import jwt from "jsonwebtoken";
import * as userRepository from "../data/auth.js";
import "express-async-error";
import bcrypt from "bcrypt";
import { config } from "../config.js";

export const signup = async (req, res) => {
  const { username, password, name, email, url } = req.body;
  const found = await userRepository.findByUsername(req.body.username);
  if (found) {
    return res.status(409).json({ message: `${username} already exists` }); // 409 Conflict.
  }

  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds); // 해싱은 컨트롤러?
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  const token = createJwtToken(userId);
  setToken(res, token);
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
  setToken(res, token);
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
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
};

const setToken = (res, token) => {
  const options = {
    maxAge: config.jwt.expiresInSec * 1000,
    httpOnly: true,
    sameSite: "none", // 서버와 클라이언트가 다른 도메인이라도 서로 동작할 수 있도록 설정.
    secure: true,
  };
  res.cookie("token", token, options); // Http-Only 🍪
};
