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
import { config } from "../config.js";
const AUTH_ERROR = { message: "Authentication Error" };
export const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.get("Authorization");
    if (!(authHeader && authHeader.startsWith("Bearer "))) {
        return res.status(401).json(AUTH_ERROR);
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, //
    config.jwt.secretKey, (error, decode) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            return res.status(401).json(AUTH_ERROR);
        }
        const user = yield userRepository.findById(decode.id);
        if (!user) {
            return res.status(401).json(AUTH_ERROR);
        }
        req.userId = user.id;
        next();
    }));
});
//# sourceMappingURL=auth.js.map