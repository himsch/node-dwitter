import jwt from "jsonwebtoken";
import * as userRepository from "../data/auth.js";
import { config } from "../config.js";

const AUTH_ERROR = { message: "Authentication Error" };

export const isAuth = async (req, res, next) => {
  // 1. Cookie (for Browser)
  // 2. Header (for Non-Browser Client)

  let token;
  // check the header first
  const authHeader = req.get("Authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // if no token in the header, check the cookie
  if (!token) {
    token = req.cookies["token"];
  }

  if (!token) {
    return res.status(401).json(AUTH_ERROR);
  }

  jwt.verify(
    token, //
    config.jwt.secretKey,
    async (error, decode) => {
      if (error) {
        return res.status(401).json(AUTH_ERROR);
      }
      const user = await userRepository.findById(decode.id);
      if (!user) {
        return res.status(401).json(AUTH_ERROR);
      }
      req.userId = user.id;
      req.token = token;
      next();
    }
  );
};
