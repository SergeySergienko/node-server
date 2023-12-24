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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const repositories_1 = require("../repositories");
const auth_service_1 = __importDefault(require("../services/auth-service"));
const utils_1 = require("../utils");
class AuthController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const userData = yield auth_service_1.default.signup(email, password);
                if (!userData) {
                    return res.sendStatus(500);
                }
                else {
                    res.cookie('refreshToken', userData.refreshToken, {
                        maxAge: 24 * 60 * 60 * 1000,
                        httpOnly: true,
                    });
                    return res.status(201).json(userData);
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ errorMessage: 'Registration Error' });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield repositories_1.userCollection.findOne({ email });
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
                return res.status(500).json({ errorMessage: 'Login Error' });
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    activate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=auth.js.map