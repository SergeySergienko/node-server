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
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
class AuthController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                // const candidate = await User.findOne({ username });
                // if (candidate) {
                //   res
                //     .status(409)
                //     .json({ errorMessage: 'User with this username already exists' });
                // }
                const result = yield repositories_1.userCollection.insertOne({
                    username,
                    password,
                    role: { value: 'USER' },
                });
                console.log('AuthController ~ result:', result);
                res.sendStatus(201);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: 'Registration Error' });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: 'Login Error' });
            }
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=auth%20copy.js.map