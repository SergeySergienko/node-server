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
exports.getUserWithTokens = exports.setCookie = exports.userModelMapper = void 0;
const token_service_1 = __importDefault(require("./services/token-service"));
const userModelMapper = ({ _id, email, roles, isActivated, activationLink, }) => ({
    id: _id.toString(),
    email: email,
    roles: roles,
    isActivated: isActivated,
    activationLink: activationLink,
});
exports.userModelMapper = userModelMapper;
const setCookie = (res, cookieName, cookieValue) => res.cookie(cookieName, cookieValue, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'none',
});
exports.setCookie = setCookie;
const getUserWithTokens = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (0, exports.userModelMapper)(userData);
    const tokens = token_service_1.default.generateTokens(user);
    yield token_service_1.default.saveToken(user.id, tokens.refreshToken);
    return Object.assign(Object.assign({}, tokens), { user });
});
exports.getUserWithTokens = getUserWithTokens;
//# sourceMappingURL=utils.js.map