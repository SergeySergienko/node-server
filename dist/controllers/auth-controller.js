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
const auth_service_1 = __importDefault(require("../services/auth-service"));
const utils_1 = require("../utils");
class AuthController {
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield auth_service_1.default.signup(req.body);
                return res.status(201).json(userData);
            }
            catch (error) {
                next(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const userData = yield auth_service_1.default.login({ email, password });
                (0, utils_1.setCookie)(res, 'refreshToken', userData.refreshToken);
                return res.json(userData);
            }
            catch (error) {
                next(error);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                yield auth_service_1.default.logout(refreshToken);
                res.clearCookie('refreshToken');
                return res.json({ message: 'User successfully logged out' });
            }
            catch (error) {
                next(error);
            }
        });
    }
    activate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activationLink = req.params.link;
                const userData = yield auth_service_1.default.activate(activationLink);
                (0, utils_1.setCookie)(res, 'refreshToken', userData.refreshToken);
                return res.json(userData);
            }
            catch (error) {
                next(error);
            }
        });
    }
    refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const userData = yield auth_service_1.default.refresh(refreshToken);
                (0, utils_1.setCookie)(res, 'refreshToken', userData.refreshToken);
                return res.json(userData);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=auth-controller.js.map