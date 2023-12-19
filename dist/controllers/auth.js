"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
class AuthController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const users = yield repositories_1.userCollection.find({}).toArray();
                const candidate = users.some((u) => u.username === username);
                if (candidate) {
                    return res
                        .status(409)
                        .json({ errorMessage: 'User with this username already exists' });
                }
                const userRole = yield repositories_1.roleCollection.findOne({ value: 'USER' });
                if (!userRole) {
                    return res
                        .status(400)
                        .json({ errorMessage: "User's role is not found" });
                }
                const newUser = {
                    username,
                    password: bcrypt_1.default.hashSync(password, 7),
                    role: [userRole.value],
                };
                const result = yield repositories_1.userCollection.insertOne(newUser);
                if (result.insertedId) {
                    const { password } = newUser, rest = __rest(newUser, ["password"]);
                    return res.status(201).json(rest);
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ errorMessage: 'Registration Error' });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = yield repositories_1.userCollection.findOne({ username });
                if (!user) {
                    return res
                        .status(404)
                        .json({ errorMessage: 'Incorrect username or password' });
                }
                const isPasswordValid = bcrypt_1.default.compareSync(password, user.password);
                if (!isPasswordValid) {
                    return res
                        .status(404)
                        .json({ errorMessage: 'Incorrect username or password' });
                }
                const token = (0, utils_1.generateAccessToken)(user._id, user.role);
                return res.json({ token });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: 'Login Error' });
            }
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=auth.js.map