var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as tweetsRepository from "../data/tweets.js";
import { getSocketIO } from "../connection/socket.js";
export const getTweets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.query;
    const data = yield (username
        ? tweetsRepository.getAllByUsername(username)
        : tweetsRepository.getAll());
    res.status(200).json(data);
});
export const getTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const tweet = yield tweetsRepository.getById(id);
    if (tweet) {
        res.status(200).json(tweet);
    }
    else {
        res.status(404).json({ message: `Tweet id(${id}) not found` });
    }
});
export const createTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = req.body;
    const tweet = yield tweetsRepository.create(text, req.userId);
    res.status(201).json(tweet);
    getSocketIO().emit("tweets", tweet);
});
export const updateTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { text } = req.body;
    const prev = yield tweetsRepository.getById(id);
    if (!prev) {
        return res.sendStatus(404);
    }
    if (prev.userId !== req.userId) {
        return res.sendStatus(403);
    }
    const tweet = yield tweetsRepository.update(id, text);
    if (tweet) {
        res.status(200).json(tweet);
    }
    else {
        res.status(400).send({ message: `Tweet id(${id}) not found` });
    }
});
export const removeTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const prev = yield tweetsRepository.getById(id);
    if (!prev) {
        return res.sendStatus(404);
    }
    if (prev.userId !== req.userId) {
        return res.sendStatus(403);
    }
    yield tweetsRepository.remove(id);
    res.sendStatus(204);
});
//# sourceMappingURL=tweets.js.map