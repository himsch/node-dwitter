var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import * as userRepository from "../data/auth.js";
import "express-async-error";
import bcrypt from "bcrypt";
import { config } from "../config.js";
export const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, name, email, url } = req.body;
    const found = yield userRepository.findByUsername(req.body.username);
    if (found) {
        return res.status(409).json({ message: `${username} already exists` }); // 409 Conflict.
    }
    const hashed = yield bcrypt.hash(password, config.bcrypt.saltRounds); // 해싱은 컨트롤러?
    const userId = yield userRepository.createUser({
        username,
        password: hashed,
        name,
        email,
        url,
    });
    const token = createJwtToken(userId);
    return res.status(201).json({ token, username }); // 201, created
});
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield userRepository.findByUsername(username);
    // error 처리도 컨트롤러?
    if (!user) {
        // 401 Unauthorized, 보안 민감한 정보는 상세한 정보를 제공하면 안됀다.
        return res.status(401).json({ message: "Invalid user or password" });
    }
    const isValidPassword = yield bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        // 401 Unauthorized, 보안 민감한 정보는 상세한 정보를 제공하면 안됀다.
        return res.status(401).json({ message: "Invalid user or password" });
    }
    const token = createJwtToken(user.id);
    return res.status(200).json({ token, username });
});
export const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.findById(req.userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ token: req.token, username: user.username });
});
const createJwtToken = (id) => {
    console.log(config.jwt.secretKey);
    return jwt.sign({ id }, config.jwt.secretKey, {
        expiresIn: config.jwt.expiresInSec,
    });
};
//# sourceMappingURL=auth.js.map