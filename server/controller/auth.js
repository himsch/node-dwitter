import * as authRepository from "../data/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET_KEY;

export const signup = async (req, res) => {
  const isExist = await authRepository.isExist(req.body.username);
  if (isExist) {
    return res.status(400).json({ message: "username existed" });
  }

  const { id, username } = await authRepository.create(req.body);
  const token = jwt.sign(
    {
      id,
    },
    secret
  );
  return res.status(201).json({ token, username });
};

export const login = async (req, res) => {
  try {
    const { id, username } = await authRepository.get(req.body);
    const token = jwt.sign(
      {
        id,
      },
      secret
    );
    return res.status(201).json({ token, username });
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};
