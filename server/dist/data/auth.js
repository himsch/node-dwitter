var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let users = [
    {
        id: "1",
        username: "bob",
        password: "$2b$12$K1MgXcN/if9eXD/i7smg9.e3kxamwzZFvI5KQ/slYH62ZCDULVRVC",
        name: "Bob",
        email: "bob@gmail.com",
        url: "",
    },
    {
        id: "2",
        username: "ellie",
        password: "$2b$12$K1MgXcN/if9eXD/i7smg9.e3kxamwzZFvI5KQ/slYH62ZCDULVRVC",
        name: "Ellie",
        email: "ellie@gmail.com",
        url: "",
    },
];
export const findByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return users.find((u) => u.username === username);
});
export const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return users.find((u) => u.id === id);
});
export const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const created = Object.assign(Object.assign({}, user), { id: Date.now().toString() });
    users = [...users, created];
    return user.id;
});
//# sourceMappingURL=auth.js.map