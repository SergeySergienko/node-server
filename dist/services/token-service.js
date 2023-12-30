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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const repositories_1 = require("../repositories");
class TokenService {
    generateTokens(payload) {
        const accessToken = jsonwebtoken_1.default.sign(payload, config_1.JWT_ACCESS_SECRET, {
            expiresIn: '15s',
        });
        const refreshToken = jsonwebtoken_1.default.sign(payload, config_1.JWT_REFRESH_SECRET, {
            expiresIn: '30s',
        });
        return { accessToken, refreshToken };
    }
    validateAccessToken(token) {
        try {
            const userData = jsonwebtoken_1.default.verify(token, config_1.JWT_ACCESS_SECRET);
            return userData;
        }
        catch (error) {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            const userData = jsonwebtoken_1.default.verify(token, config_1.JWT_REFRESH_SECRET);
            return userData;
        }
        catch (error) {
            return null;
        }
    }
    saveToken(userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield repositories_1.tokenCollection.findOne({ user: userId });
            if (tokenData) {
                return yield repositories_1.tokenCollection.updateOne({ user: userId }, { $set: { refreshToken } });
            }
            const token = yield repositories_1.tokenCollection.insertOne({
                user: userId,
                refreshToken,
            });
            return token;
        });
    }
    removeToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield repositories_1.tokenCollection.deleteOne({ refreshToken });
        });
    }
    findToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield repositories_1.tokenCollection.findOne({ refreshToken });
        });
    }
}
exports.default = new TokenService();
//# sourceMappingURL=token-service.js.map