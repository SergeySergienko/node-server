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
const uuid_1 = require("uuid");
const api_error_1 = require("../exceptions/api-error");
const repositories_1 = require("../repositories");
const mail_service_1 = __importDefault(require("./mail-service"));
const token_service_1 = __importDefault(require("./token-service"));
class AuthService {
    signup({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield repositories_1.userCollection.findOne({ email });
            if (candidate) {
                throw api_error_1.ApiError.BadRequest(409, `User with email ${email} already exists`, [
                    {
                        type: 'field',
                        value: email,
                        msg: 'email address must be unique',
                        path: 'email',
                        location: 'body',
                    },
                ]);
            }
            const userRole = (yield repositories_1.roleCollection.findOne({
                value: 'USER',
            }));
            const hashPassword = yield bcrypt_1.default.hash(password, 7);
            const identifier = (0, uuid_1.v4)();
            const newUser = {
                email,
                password: hashPassword,
                roles: [userRole.value],
                activationLink: identifier,
                isActivated: false,
            };
            const result = yield repositories_1.userCollection.insertOne(newUser);
            if (result.insertedId) {
                yield mail_service_1.default.sendActivationMail(email, identifier);
                const { password, activationLink } = newUser, user = __rest(newUser, ["password", "activationLink"]);
                const tokens = token_service_1.default.generateTokens(Object.assign(Object.assign({}, user), { _id: result.insertedId }));
                yield token_service_1.default.saveToken(result.insertedId, tokens.refreshToken);
                return Object.assign(Object.assign({}, tokens), { user });
            }
        });
    }
    login({ email, password: userPassword }) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = yield repositories_1.userCollection.findOne({ email });
            if (!currentUser) {
                throw api_error_1.ApiError.BadRequest(404, 'Incorrect username or password');
            }
            const isPasswordValid = yield bcrypt_1.default.compare(userPassword, currentUser.password);
            if (!isPasswordValid) {
                throw api_error_1.ApiError.BadRequest(404, 'Incorrect username or password');
            }
            const { password, activationLink } = currentUser, user = __rest(currentUser, ["password", "activationLink"]);
            const tokens = token_service_1.default.generateTokens(user);
            yield token_service_1.default.saveToken(user._id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user });
        });
    }
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield token_service_1.default.removeToken(refreshToken);
        });
    }
    activate(activationLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield repositories_1.userCollection.findOne({ activationLink });
            if (!user) {
                throw api_error_1.ApiError.BadRequest(400, 'Activation link is incorrect');
            }
            const result = yield repositories_1.userCollection.updateOne({ activationLink }, { $set: { isActivated: true }, $unset: { activationLink: '' } });
            return result.matchedCount === 1;
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw api_error_1.ApiError.UnauthorizedError();
            }
            const userData = token_service_1.default.validateRefreshToken(refreshToken);
            const tokenFromDb = yield token_service_1.default.findToken(refreshToken);
            if (!userData || !tokenFromDb) {
                throw api_error_1.ApiError.UnauthorizedError();
            }
            const user = yield repositories_1.userCollection.findOne({ email: userData.email });
            if (!user) {
                throw api_error_1.ApiError.UnauthorizedError();
            }
            const tokens = token_service_1.default.generateTokens(user);
            yield token_service_1.default.saveToken(user._id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user });
        });
    }
}
exports.default = new AuthService();
//# sourceMappingURL=auth-service.js.map